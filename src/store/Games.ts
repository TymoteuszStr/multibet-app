import { defineStore } from "pinia";
import { ref } from "vue";
import type { Game } from "@/types/Game";

export const useGameStore = defineStore("games", () => {
  const games = ref<Game[]>([]);
  const currentlyPreviewedGames = ref<Game[]>([]);
  function setGames(newGames: Game[]) {
    games.value = newGames;
  }
  function toggleCurrentlyPreviewedGames(newGame: Game) {
    if (currentlyPreviewedGames.value.find((game) => game.id === newGame.id)) {
      currentlyPreviewedGames.value = currentlyPreviewedGames.value.filter(
        (game) => game.id !== newGame.id
      );
    } else {
      currentlyPreviewedGames.value.push(newGame);
    }
  }
  return {
    games,
    setGames,
    currentlyPreviewedGames,
    toggleCurrentlyPreviewedGames,
  };
});
