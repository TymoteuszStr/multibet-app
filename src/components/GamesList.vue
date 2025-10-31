<script setup lang="ts">
import { computed, onMounted, watch, ref } from "vue";
import { useGameStore } from "@/store/Games";
import { useFetch } from "@/composables/useFetch";
import type { Game } from "@/types/Game";
import DropDownList from "@/components/shared/DropDownList.vue";
import FilterSelect from "@/components/shared/FilterSelect.vue";
import {
  faWifi,
  faFutbolBall,
  faBasketball,
  faTableTennisPaddleBall,
  faHockeyPuck,
} from "@fortawesome/free-solid-svg-icons";

const sportIcons = {
  Football: faFutbolBall,
  Basketball: faBasketball,
  Tennis: faTableTennisPaddleBall,
  Hockey: faHockeyPuck,
};
const gameStore = useGameStore();
const games = computed(() => gameStore.games);

const statusFilter = ref<"all" | Game["status"]>("all");

const statusOptions = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "live", label: "Live" },
  { value: "finished", label: "Finished" },
];

const filteredGames = computed(() => {
  if (statusFilter.value === "all") return games.value;
  return games.value.filter((game: Game) => game.status === statusFilter.value);
});

const sports = computed(() => {
  const sportsSet = new Set<string>();
  filteredGames.value.forEach((game: Game) => {
    sportsSet.add(game.sport);
  });
  return Array.from(sportsSet);
});

const gamesBySport = computed(() => {
  const grouped: Record<string, Game[]> = {};
  sports.value.forEach((sport) => {
    grouped[sport] = filteredGames.value.filter(
      (game: Game) => game.sport === sport
    );
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
  <FilterSelect
    v-model="statusFilter"
    label="Status"
    :options="statusOptions"
    id="statusFilter"
  />
  <div v-if="filteredGames.length !== 0" class="list-wrapper">
    <DropDownList
      v-for="sport in sports"
      :key="sport"
      :header="{ label: sport, icon: sportIcons[sport as keyof typeof sportIcons] }"
      :items="gamesBySport[sport]?.map((game: Game) => ({
      id: game.id,
      label: `${game.homeTeam} - ${game.awayTeam}`,
      icon: game.status === 'live' ? faWifi : undefined
    })) || []"
      @item-click="gameClickHandle($event)"
    ></DropDownList>
  </div>
  <div v-else-if="loading" class="info">Loading...</div>
  <div v-else class="info">No games found</div>
</template>

<style scoped lang="scss">
.info {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
