<script setup lang="ts">
import type { Game } from "@/types/Game";
import dayjs from "dayjs";
import BetButtonsPanel from "./BetButtonsPanel.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
defineProps<{
  game: Game;
}>();
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
      <BetButtonsPanel :game="game" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.game {
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
}
</style>
