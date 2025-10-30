import { defineStore } from "pinia";
import { ref } from "vue";
import type { Game } from "@/types/Game";

export const useGameStore = defineStore("games", () => {
  const games = ref<Game[]>([]);
  const currentlyPreviewedGames = ref<Game[]>([]);
  function getGameById(id: string) {
    const finding = games.value.find((game) => game.id === id);
    if (finding) return finding;
  }
  function setGames(newGames: Game[]) {
    games.value = newGames;
  }
  function toggleCurrentlyPreviewedGames(newGame: Game) {
    if (currentlyPreviewedGames.value.find((game) => game.id === newGame.id)) {
      currentlyPreviewedGames.value = currentlyPreviewedGames.value.filter(
        (game) => game.id !== newGame.id
      );
    } else {
      currentlyPreviewedGames.value.unshift(newGame);
    }
  }
  return {
    games,
    setGames,
    currentlyPreviewedGames,
    toggleCurrentlyPreviewedGames,
    getGameById,
  };
});
