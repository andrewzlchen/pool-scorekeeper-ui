import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./common/layout";
import Auth from "./pages/auth";
import Home from "./pages/home";
import GameSettings from "./pages/game-settings";
import Game from "./pages/game";
import { RealmAppProvider } from "./hooks/useRealmApp";
import { MatchContextProvider } from "./hooks/useMatch";
import { GameType } from "./common/types";
import appConfig from "../realm.json";
import "./App.css";
import MatchGames from "./pages/match-games/MatchGames";
import Matches from "./pages/matches/Matches";

const { appId } = appConfig;

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
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
      element: <MatchGames />,
    },
    {
      path: "/matches/:matchid/games/:gameid/settings",
      element: (
        <MatchContextProvider>
          <GameSettings
            date={"10/10/2021"}
            teamA={{
              id: "1",
              name: "Team A",
              players: [
                { id: "1", name: "Kool-aid Man" },
                { id: "2", name: "Capn' Crunch" },
              ],
            }}
            teamB={{
              id: "2",
              name: "Team B",
              players: [
                { id: "100", name: "John Doe" },
                { id: "101", name: "Jane Doe" },
              ],
            }}
          />
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
      <div className="App">
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </div>
    </RealmAppProvider>
  );
}

export default App;
