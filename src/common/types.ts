export interface TeamMatch {
  id: string;
  singlesMatches: SinglesMatch[];
}

export interface SinglesMatch {
  id: string;
  racks: Game[];
}

export interface Game {
  states: GameState[];
}

export interface GameState {
  balls: boolean[];
  player: Player;
}

type Player = {
  id: string;
  name: string;
};

export enum GameType {
  EightBall = 8,
  NineBall = 9,
}

interface GameSettings {
  gameType: GameType;
  playerA: Player;
  playerB: Player;
}

enum Action {
  Safety = "safety",
  Scratch = "scratch",
  Turnover = "turnover",
}

interface Props {
  matchId: string;
  gameSettings: GameSettings;
}
