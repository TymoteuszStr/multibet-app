<script setup lang="ts">
import { computed, TransitionGroup } from "vue";
import { useGameStore } from "@/store/Games";

import GamePanel from "./GamePanel.vue";

const gameStore = useGameStore();
const games = computed(() => gameStore.currentlyPreviewedGames);
</script>

<template>
  <div class="dashboard">
    <TransitionGroup name="game-list" tag="div" class="dashboard__list">
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
.dashboard__list {
  display: flex;
  flex-direction: column;
}
.dashboard__content {
  margin-bottom: 40px;
}

.game-list-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.game-list-leave-active {
  transition: all 0.3s ease-in;
}

.game-list-enter-from {
  opacity: 0;
  transform: translateX(-30px) scale(0.95);
}

.game-list-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}

.game-list-move {
  transition: transform 0.4s ease;
}
</style>
