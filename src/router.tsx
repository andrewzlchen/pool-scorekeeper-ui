import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Auth from "./pages/auth";
import Game from "./pages/game";
import { RealmAppProvider } from "./hooks/useRealmApp";
import { MatchContextProvider } from "./hooks/useMatch";
import { GameType } from "./common/types";
import appConfig from "../realm.json";
import MatchGames from "./pages/match-games/MatchGames";
import Matches from "./pages/matches/Matches";

const { appId } = appConfig;

function Router() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Auth isLogin />,
    },
    {
      path: "/signup",
      element: <Auth />,
    },
    {
      path: "/matches",
      element: <Matches />,
    },
    {
      path: "/matches/:matchid/games",
      element: (
        <MatchContextProvider>
          <MatchGames />
        </MatchContextProvider>
      ),
    },
    {
      path: "/matches/:matchid/games/:gameid",
      element: (
        <MatchContextProvider>
          <Game
            matchId="foobar"
            gameSettings={{
              gameType: GameType.EightBall,
              playerA: { id: "1", name: "eren" },
              playerB: { id: "2", name: "armin" },
            }}
          />
        </MatchContextProvider>
      ),
    },
  ]);

  return (
    <RealmAppProvider appId={appId}>
      <RouterProvider router={router} />
    </RealmAppProvider>
  );
}

export default Router;
