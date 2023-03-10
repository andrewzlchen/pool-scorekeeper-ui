import React from "react";
import { PropsWithChildren } from "react";

import { GameType, SinglesMatch } from "../common/types";

const MatchContext = React.createContext<{
  match?: SinglesMatch;
  setMatch: (match: SinglesMatch) => void;
} | null>(null);

export const MatchContextProvider = ({ children }: PropsWithChildren) => {
  const [match, setMatch] = React.useState<SinglesMatch>({
    id: "testId",
    settings: {
      gameType: GameType.EightBall,
      playerA: {
        _id: "testPlayerA",
        name: "test player a",
      },
      playerB: {
        _id: "testPlayerB",
        name: "test player b",
      },
    },
    games: [],
  });

  return (
    <MatchContext.Provider value={{ match, setMatch }}>
      {children}
    </MatchContext.Provider>
  );
};

const useMatch = () => {
  const matchCtx = React.useContext(MatchContext);
  if (!matchCtx) {
    throw new Error(
      "cannot use useMatch unless inside of match context provider"
    );
  }
  return matchCtx;
};

export default useMatch;
