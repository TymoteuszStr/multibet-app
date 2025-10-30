<script setup lang="ts">
import { useBetsStore } from "@/store/Bets";
import Button from "./shared/Button.vue";
import { computed } from "vue";
import BetPanel from "./BetPanel.vue";
import { useGameStore } from "@/store/Games";
import { useNotifications } from "@/composables/useNotifications";

// const payload = {
//   selections: [
//     {
//       gameId: "g-001",
//       betType: "home",
//       stake: 10,
//       odds: 2.15,
//       potentialPayout: 21.5,
//     },
//   ],
//   totalStake: 10,
//   totalPotentialPayout: 21.5,
//   acceptedTerms: true,
// };
// async function sendBet() {
//   const { get, post } = useFetch();
//   const resp = await get("/games");
//   console.log(resp);
// }
const gameStore = useGameStore();
const betStore = useBetsStore();
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

function handlePlaceBet() {
  addNotification({
    title: "helo test",
    type: "error",
    description: "This is a description",
  });
}
</script>

<template>
  <div class="bets">
    <div class="bets__header">Bets: {{ bets.length ?? 0 }}</div>
    <TransitionGroup name="animated-list" tag="div">
      <BetPanel
        v-for="result in results"
        :key="result.bet.id"
        :bet="result.bet"
        :game="result.game!"
        @remove="handleRemoveBet(result.bet.id)"
      />
    </TransitionGroup>
    <div class="bets__footer">
      <div>Total stake: {{ total.betsStake }} €</div>
      <div>Potential payout: {{ total.potentialPayout }}€</div>
      <Button class="bet-btn" @click="handlePlaceBet">Place a bet</Button>
    </div>
  </div>
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
  }
}
</style>
