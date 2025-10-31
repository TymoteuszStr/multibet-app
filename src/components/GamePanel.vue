<script setup lang="ts">
import type { Game } from "@/types/Game";
import dayjs from "dayjs";
import BetButtonsPanel from "./BetButtonsPanel.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Input from "./shared/InputNumber.vue";
import { ref } from "vue";
import { useBetsStore } from "@/store/Bets";
import { useValidate } from "@/composables/useValidate";
defineProps<{
  game: Game;
}>();
const stake = ref(1);
const betStore = useBetsStore();
const { validateBet, validateStake, validateGame } = useValidate();
function handleBet(game: Game, betType: "homeWin" | "draw" | "awayWin") {
  if (!validateGame(game)) return;
  if (!validateStake(stake.value)) return;
  if (!validateBet(game, betType)) return;

  const odds = game.odds[betType as keyof typeof game.odds] ?? 0;
  betStore.addBet({
    id: crypto.randomUUID(),
    gameId: game.id,
    betType: betType,
    stake: stake.value,
    odds,
    potentialPayout: stake.value * odds,
  });
}
function handleChangeStake(value: string | number) {
  if (!validateStake(Number(value))) return;
}
</script>

<template>
  <div class="game">
    <div class="game__header">
      <div class="game__header__status">Status: {{ game.status }}</div>
      <font-awesome-icon
        :icon="faXmark"
        class="game__header__close"
        @click="$emit('close')"
      />
    </div>
    <h1 class="game__title">
      {{ game.homeTeam }}
      <p class="game__title__time">
        {{ dayjs(game.startTime).format("HH:mm") }}
      </p>
      {{ game.awayTeam }}
    </h1>

    <div class="game__bets-panel">
      <BetButtonsPanel :game="game" @bet="handleBet(game, $event)" />
    </div>
    <Input
      v-if="game.status !== 'finished'"
      v-model="stake"
      class="game__stake-input"
      @update:modelValue="handleChangeStake($event)"
    />
  </div>
</template>

<style scoped lang="scss">
.game {
  border-bottom: 1px solid var(--overlay-md);
  padding-bottom: 20px;
  margin-bottom: 20px;
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__close {
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;
      &:hover {
        color: var(--muted);
      }
    }
  }
  &__title {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    &__time {
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0 15px;
      color: var(--primary);
    }
  }

  &__stake-input {
    max-width: 300px;
    margin: 20px 0 0 auto;
  }
}
</style>
