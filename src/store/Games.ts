import { defineStore } from "pinia";
import { ref } from "vue";
import type { Game } from "@/types/Game";

export const useGameStore = defineStore("games", () => {
  const games = ref<Game[]>([]);
  const currentlyPreviewedGame = ref<Game | null>(null);
  function setGames(newGames: Game[]) {
    games.value = newGames;
  }
  function setCurrentlyPreviewedGame(newGame: Game) {
    currentlyPreviewedGame.value = newGame;
  }
  return { games, setGames, currentlyPreviewedGame, setCurrentlyPreviewedGame };
});
