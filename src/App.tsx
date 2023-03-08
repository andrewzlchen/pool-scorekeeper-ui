import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./common/layout";
import Auth from "./pages/auth";
import Home from "./pages/home";
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
