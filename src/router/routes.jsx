import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ErrorPage from "../page/ErrorPage";
import Home from "../page/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      //   { path: "login", element: <Login /> },
      //   { path: "register", element: <Register /> },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
