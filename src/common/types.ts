export interface TeamMatch {
  id: string;
  singlesMatches: SinglesMatch[];
}

export interface SinglesMatch {
  id: string;
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
  id: string;
  name: string;
}

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
