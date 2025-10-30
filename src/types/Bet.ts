export type Bet = {
  id: string;
  gameId: string;
  betType: BetType;
  stake: number;
  odds: number;
  potentialPayout: number;
};

export type BetType = "homeWin" | "draw" | "awayWin";
