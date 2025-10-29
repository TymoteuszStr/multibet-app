export type Bet = {
  id: string;
  gameId: string;
  betType: "homeWin" | "draw" | "awayWin";
  stake: number;
  odds: number;
  potentialPayout: number;
};
