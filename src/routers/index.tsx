import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../layouts/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

const Routers = () => {
  return <RouterProvider router={router} />;
};

export default Routers;
