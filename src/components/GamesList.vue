<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useGameStore } from "@/store/Games";
import { useFetch } from "@/composables/useFetch";
import type { Game } from "@/types/Game";
import { useRouter } from "vue-router";
import DropDownList from "@/components/shared/DropDownList.vue";

const gameStore = useGameStore();
const games = computed(() => gameStore.games);

const sports = computed(() => {
  const sportsSet = new Set<string>();
  games.value.forEach((game: Game) => {
    sportsSet.add(game.sport);
  });
  return Array.from(sportsSet);
});

const gamesBySport = computed(() => {
  const grouped: Record<string, Game[]> = {};
  sports.value.forEach((sport) => {
    grouped[sport] = games.value.filter((game: Game) => game.sport === sport);
  });
  return grouped;
});

const { data, loading, get } = useFetch<Game[]>();

watch(data, (currentData) => {
  if (!currentData) return;
  gameStore.setGames(currentData);
});
onMounted(() => {
  get("/games");
});

function gameClickHandle(id: string) {
  gameStore.toggleCurrentlyPreviewedGames(
    games.value.find((game: Game) => game.id === id)!
  );
}
</script>

<template>
  <div v-if="games.length !== 0" class="list-wrapper">
    <DropDownList
      v-for="sport in sports"
      :key="sport"
      :header="sport"
      :items="gamesBySport[sport]?.map((game: Game) => ({
      id: game.id,
      label: `${game.homeTeam} - ${game.awayTeam}`,
    })) || []"
      @item-click="gameClickHandle($event)"
    ></DropDownList>
  </div>
</template>

<style scoped lang="scss"></style>
