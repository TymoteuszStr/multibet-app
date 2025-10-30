<script setup lang="ts">
import { computed, TransitionGroup } from "vue";
import { useGameStore } from "@/store/Games";

import GamePanel from "./GamePanel.vue";

const gameStore = useGameStore();
const games = computed(() => gameStore.currentlyPreviewedGames);
</script>

<template>
  <div class="dashboard">
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
  min-width: 400px;
  &__list {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}
</style>
