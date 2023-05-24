import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRouter } from "./ProtectedRouter";

import Login from "../layouts/Login";
import Register from "../layouts/Register";
import Home from "../layouts/Home";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRouter>
        <Home />
      </ProtectedRouter>
    ),
  },
]);

const Routers = () => {
  return <RouterProvider router={router} />;
};

export default Routers;
