<script setup lang="ts">
import { useBetsStore } from "@/store/Bets";
import Button from "./shared/Button.vue";
import { computed } from "vue";
import BetPanel from "./BetPanel.vue";
import { useGameStore } from "@/store/Games";
import { useFetch } from "@/composables/useFetch";
import Cookies from "universal-cookie";
import TermsModal from "./shared/TermsModal.vue";
import { ref } from "vue";
import { ACCEPTED_TERMS_COOKIE_NAME } from "@/assets/constants";
import { useNotifications } from "@/composables/useNotifications";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const gameStore = useGameStore();
const betStore = useBetsStore();
const { post } = useFetch();
const cookies = new Cookies();
const { addNotification } = useNotifications();
const bets = computed(() => betStore.bets);
const total = computed(() => ({
  betsStake: bets.value.reduce((acc, bet) => acc + bet.stake, 0) ?? 0,
  potentialPayout:
    bets.value.reduce((acc, bet) => acc + bet.potentialPayout, 0) ?? 0,
}));

const results = computed(() =>
  bets.value.map((bet) => ({ bet, game: gameStore.getGameById(bet.gameId) }))
);
function handleRemoveBet(gameId: string) {
  betStore.removeBet(gameId);
}

function handleChangeStake(betId: string, newStake: number) {
  betStore.changeStake(betId, newStake);
}

const showTermsModal = ref(false);
async function handlePlaceBet() {
  if (!cookies.get(ACCEPTED_TERMS_COOKIE_NAME)) {
    showTermsModal.value = true;
    return;
  }
  try {
    await post("/bets", {
      bets: bets.value,
      totalStake: total.value.betsStake,
      totalPotentialPayout: total.value.potentialPayout,
      acceptedTerms: true,
    });
    {
      betStore.resetBets();
      addNotification({
        title: "Bet placed",
        type: "success",
        description: "Your bet has been placed successfully",
      });
    }
  } catch (error) {
    console.error(error);
    addNotification({
      title: "Error",
      type: "error",
      description: "Something went wrong",
    });
  }
}
</script>

<template>
  <div class="bets">
    <div class="bets__header">
      <div>Bets: {{ bets.length ?? "0" }}</div>
      <font-awesome-icon
        :icon="faTrash"
        class="bets__header__remove"
        @click="betStore.resetBets()"
      />
    </div>
    <TransitionGroup name="animated-list" tag="div">
      <BetPanel
        v-for="result in results"
        :key="result.bet.id"
        :bet="result.bet"
        :game="result.game!"
        @remove="handleRemoveBet(result.bet.id)"
        @update:stake="handleChangeStake(result.bet.id, $event)"
      />
    </TransitionGroup>
    <div class="bets__footer">
      <div>
        Total stake:
        <span class="bets__footer__total-stake">{{ total.betsStake }} €</span>
      </div>
      <div>
        Potential payout:
        <span class="bets__footer__total-stake">
          {{ Math.round(total.potentialPayout * 100) / 100 }}€</span
        >
      </div>
      <Button class="bet-btn" @click="handlePlaceBet">Place a bet</Button>
    </div>
  </div>
  <TermsModal v-model="showTermsModal" />
</template>

<style scoped lang="scss">
.bets {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__header {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__remove {
      cursor: pointer;
      &:hover {
        color: var(--muted);
      }
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 20px;
  }
  &__footer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    &__total-stake {
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
}
</style>
