// DB Types
export interface TeamMatch {
  _id: string;
  singles_Matches: SinglesMatch[];
  ts: number;
  team1: Team;
  team2: Team;
}

export interface SinglesMatch {
  _id: string;
  settings: GameSettings;
  games: Game[];
}

export interface Game {
  states: GameState[];
}
export interface GameState {
  balls: boolean[];
  player: Player;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
}

export interface Player {
  _id: string;
  name: string;
}

export interface PlayerStats {
  overall: OverallPlayerStats;
  season: string;
}
interface OverallPlayerStats {
  wins: number;
  losses: number;
}

// Misc types
export enum GameType {
  EightBall = "8ball",
  NineBall = "9ball",
}

export interface GameSettings {
  gameType: GameType;
  playerA: Player;
  playerB: Player;
}

export enum Action {
  Safety = "safety",
  Scratch = "scratch",
  Turnover = "turnover",
}
