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
  function changeStake(betId: string, newStake: number) {
    bets.value = bets.value.map((bet) =>
      bet.id === betId
        ? { ...bet, stake: newStake, potentialPayout: newStake * bet.odds }
        : bet
    );
  }
  return {
    bets,
    addBet,
    removeBet,
    changeStake,
  };
});
