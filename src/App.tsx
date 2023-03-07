import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from './common/layout'
import Auth from './pages/auth'
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

      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </div>
  )
}

export default App
