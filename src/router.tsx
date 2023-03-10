import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RealmAppProvider } from "./hooks/useRealmApp";
import { MatchContextProvider } from "./hooks/useMatch";
import App from "./pages/app";
import Auth from "./pages/auth";
import ErrorPage from "./pages/error";
import Match from "./pages/match";
import Matches from "./pages/matches";
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
      errorElement: <ErrorPage error="Something bad occurred" />,
      children: [
        {
          path: "/app/matches",
          element: <Matches />,
        },
        {
          path: "/app/matches/:matchid/games",
          element: <Match />,
        },
        {
          path: "/app/matches/:matchid/games/:gameid",
          element: (
            <Game
              matchId="foobar"
              gameSettings={{
                gameType: GameType.EightBall,
                playerA: { _id: "1", name: "eren" },
                playerB: { _id: "2", name: "armin" },
              }}
            />
          ),
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage error="404 - No Page Found!" />,
    },
  ]);

  return (
    <RealmAppProvider appId={appId}>
      <RouterProvider router={router} />
    </RealmAppProvider>
  );
}

export default Router;
