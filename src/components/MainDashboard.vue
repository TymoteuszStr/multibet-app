<script setup lang="ts">
import { computed, watch } from "vue";
import { useGameStore } from "@/store/Games";
import { useFetch } from "@/composables/useFetch";
import type { Game } from "@/types/Game";
import { useRoute } from "vue-router";

const gameStore = useGameStore();
const game = computed(() => gameStore.currentlyPreviewedGame);
const { data, loading, get } = useFetch<Game>();
const route = useRoute();
const gameId = computed(() => route.params.id);

watch(gameId, async (currentId) => {
  if (!currentId) return;
  const newGame = await get(`/games/${currentId}`);
  if (!newGame) return;
  gameStore.setCurrentlyPreviewedGame(newGame);
});
</script>

<template>
  <div class="dashboard">
    <div v-if="game" class="dashboard__content">
      <div>Status: {{ game?.status }}</div>
      <h1>{{ game.homeTeam }} - {{ game.awayTeam }}</h1>
      <h2>{{ game.odds.homeWin }} - {{ game.odds.awayWin }}</h2>
    </div>
    <div v-else>Choose game...</div>
  </div>
</template>

<style scoped lang="scss"></style>
