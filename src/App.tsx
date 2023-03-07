import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from './common/layout/Layout'
import Auth from './pages/auth/Auth'
import './App.css'

function App() {
const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
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
      <h1>tablerunner</h1>

      <a href="/">
        <button>Home</button>
      </a>
      <a href="/login">
        <button>Log in</button>
      </a>
      <a href="/signup">
        <button>Sign up</button>
      </a>

      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </div>
  )
}

export default App
