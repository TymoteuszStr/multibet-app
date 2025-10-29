<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useGameStore } from "@/store/Games";
import { useFetch } from "@/composables/useFetch";
import type { Game } from "@/types/Game";
import { useRouter } from "vue-router";

const gameStore = useGameStore();
const games = computed(() => gameStore.games);
const { data, loading, get } = useFetch<Game[]>();
const router = useRouter();
watch(data, (currentData) => {
  if (!currentData) return;
  gameStore.setGames(currentData);
});
onMounted(() => {
  get("/games");
});

function gameClickHandle(id: string) {
  router.replace({ name: "MainDashboard", params: { id } });
}
</script>

<template>
  <ul>
    <li v-for="game in games" :key="game.id" @click="gameClickHandle(game.id)">
      {{ game.homeTeam }} - {{ game.awayTeam }}
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
