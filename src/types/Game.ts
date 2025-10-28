export type Game = {
  id: string;
  sport: "Football" | "Basketball" | "Tennis" | string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  odds: {
    homeWin: number;
    draw?: number;
    awayWin: number;
  };
  status: "upcoming" | "live" | "finished";
};
