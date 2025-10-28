export type Bet = {
  gameId: string;
  betType: "home" | "draw" | "away";
  stake: number;
  odds: number;
  potentialPayout: number;
};
