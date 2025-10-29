import type { Bet } from "@/types/Bet";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBetsStore = defineStore("bets", () => {
  const bets = ref<Bet[]>([]);
  function addBet(newBets: Bet) {
    if (bets.value.length >= 10) return;
    bets.value.push(newBets);
  }
  function removeBet(betId: string) {
    bets.value = bets.value.filter((bet) => bet.id !== betId);
  }
  return {
    bets,
    addBet,
    removeBet,
  };
});
