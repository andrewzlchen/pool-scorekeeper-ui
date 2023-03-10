import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RealmAppProvider } from "./hooks/useRealmApp";
import { MatchContextProvider } from "./hooks/useMatch";
import App from "./pages/app";
import Auth from "./pages/auth";
import NoPageFound from "./pages/no-page-found/NoPageFound";
import MatchGames from "./pages/match-games/MatchGames";
import Matches from "./pages/matches/Matches";
import Game from "./pages/game";

import { GameType } from "./common/types";

import appConfig from "../realm.json";
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
      path: "/app",
      element: (
        <MatchContextProvider>
          <App />
        </MatchContextProvider>
      ),
      children: [
        {
          path: "/app/matches",
          element: <Matches />,
        },
        {
          path: "/app/matches/:matchid/games",
          element: <MatchGames />,
        },
        {
          path: "/app/matches/:matchid/games/:gameid",
          element: (
            <Game
              matchId="foobar"
              gameSettings={{
                gameType: GameType.EightBall,
                playerA: { id: "1", name: "eren" },
                playerB: { id: "2", name: "armin" },
              }}
            />
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NoPageFound />,
    },
  ]);

  return (
    <RealmAppProvider appId={appId}>
      <RouterProvider router={router} />
    </RealmAppProvider>
  );
}

export default Router;
