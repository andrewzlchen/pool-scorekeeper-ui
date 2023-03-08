import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./common/layout";
import Auth from "./pages/auth";
import Home from "./pages/home";
import GameSettings from "./pages/game-settings";
import Game from "./pages/game";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Auth login />,
    },
    {
      path: "/signup",
      element: <Auth />,
    },
    {
      path: "/matches/:matchid/games/:gameid/scorekeeper",
      element: <Game />,
    },
    {
      path: "/matches/:matchid/games/:gameid/players",
      element: <GameSettings />,
    },
  ]);

  return (
    <div className="App">
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </div>
  );
}

export default App;
