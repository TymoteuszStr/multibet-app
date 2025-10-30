import type { Game } from "@/types/Game";
import { useNotifications } from "./useNotifications";
import { MAX_BETS, MAX_STAKE, MIN_STAKE } from "@/assets/constants";
import { useBetsStore } from "@/store/Bets";

export function useValidate() {
  const { addNotification } = useNotifications();
  const betStore = useBetsStore();

  function validateBet(game: Game, betType: "homeWin" | "draw" | "awayWin") {
    if (betStore.bets.length >= MAX_BETS) {
      addNotification({
        title: "Max bets reached",
        type: "error",
        description: `You can't place more than ${MAX_BETS} bets`,
      });
      return false;
    }
    if (
      betStore.bets.find(
        (bet) => bet.betType === betType && bet.gameId === game.id
      )
    ) {
      addNotification({
        title: "Bet already placed",
        type: "error",
        description: `You can't place the same bet twice`,
      });
      return false;
    }

    if (betStore.bets.find((bet) => bet.gameId === game.id)) {
      addNotification({
        title: "Be careful!",
        type: "warning",
        description: `You already have a bet on this game`,
      });
    }
    return true;
  }

  function validateStake(stake: number) {
    if (stake < MIN_STAKE) {
      addNotification({
        title: "Invalid stake",
        type: "error",
        description: `Stake must be greater than ${MIN_STAKE}`,
      });
      return false;
    }
    if (stake > MAX_STAKE) {
      addNotification({
        title: "Invalid stake",
        type: "error",
        description: `Stake must be less than ${MAX_STAKE}`,
      });
      return false;
    }
    return true;
  }

  function validateGame(game: Game) {
    if (game.status === "finished") {
      addNotification({
        title: "Game is finished",
        type: "warning",
        description: "You can't place a bet",
      });
      return false;
    }
    return true;
  }

  return { validateStake, validateGame, validateBet };
}
