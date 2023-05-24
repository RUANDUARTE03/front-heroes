import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../layouts/Login";
import Register from "../layouts/Register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const Routers = () => {
  return <RouterProvider router={router} />;
};

export default Routers;
