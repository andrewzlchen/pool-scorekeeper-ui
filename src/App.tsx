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
      path: "/matches/:matchid/games/:gameid/scorekeeper",
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
    {
      path: "/matches/:matchid/games/:gameid/players",
      element: (
        <MatchContextProvider>
          <GameSettings />
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
