import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./common/layout";
import Auth from "./pages/auth";
import Home from "./pages/home";
import GameSettings from "./pages/game-settings";
import Game, { GameType } from "./pages/game";
import { RealmAppProvider } from "./hooks/useRealmApp";
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
        <Game
          gameType={GameType.EightBall}
          playerA={{ name: "eren" }}
          playerB={{ name: "armin" }}
        />
      ),
    },
    {
      path: "/matches/:matchid/games/:gameid/players",
      element: <GameSettings />,
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
