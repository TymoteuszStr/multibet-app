<script setup lang="ts">
import { computed, TransitionGroup } from "vue";
import { useGameStore } from "@/store/Games";

import GamePanel from "./GamePanel.vue";

const gameStore = useGameStore();
const games = computed(() => gameStore.currentlyPreviewedGames);
</script>

<template>
  <div class="dashboard">
    <h2 class="dashboard__title">Games:</h2>
    <div v-if="games.length === 0">No games selected</div>
    <TransitionGroup name="animated-list" tag="div" class="dashboard__list">
      <GamePanel
        v-for="game in games"
        :key="game.id"
        :game="game"
        @close="gameStore.toggleCurrentlyPreviewedGames(game)"
        class="dashboard__content"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  min-width: 200px;
  &__list {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  &__title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
    margin-top: 0;
  }
}
@media (min-width: 1024px) {
  .dashboard {
    min-width: 600px;
  }
}
</style>
