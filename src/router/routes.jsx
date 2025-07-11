import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ErrorPage from "../page/ErrorPage";
import Home from "../page/Home";
import Login from "../page/Login";
import Register from "../page/Register";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../page/MyProfile";
import AddArticles from "../page/AddArticles";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../page/dashboardPages/Dashboard";
import AllUsers from "../page/dashboardPages/AllUsers";
import AllArticles from "../page/dashboardPages/AllArticles";
import AddPublisher from "../page/dashboardPages/AddPublisher";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/user-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-articles",
        element: (
          <PrivateRoute>
            <AddArticles />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "registration",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      { path: "all-users", Component: AllUsers },
      { path: "all-articles", Component: AllArticles },
      { path: "add-publisher", Component: AddPublisher },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
