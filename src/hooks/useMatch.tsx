import React from "react";
import { PropsWithChildren } from "react";

import { SinglesMatch } from "../common/types";

const MatchContext = React.createContext<{
  match?: SinglesMatch;
  setMatch: (match: SinglesMatch) => void;
} | null>(null);

const MatchContextProvider = ({ children }: PropsWithChildren) => {
  const [match, setMatch] = React.useState<SinglesMatch>();

  return (
    <MatchContext.Provider value={{ match, setMatch }}>
      {children}
    </MatchContext.Provider>
  );
};

const useMatch = () => {
  const match = React.useContext(MatchContext);
  if (match) {
    return [match, ""];
  }
  return [undefined, "no match found"];
};

export default useMatch;
