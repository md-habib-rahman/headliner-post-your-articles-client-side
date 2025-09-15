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
import AddPublisher from "../page/dashboardPages/AddPublisher";
import MyArticles from "../page/MyArticle";
import ArticleDetails from "../page/ArticleDetails";
import UpdateArticle from "../page/UpdateArticle";
import AllArticlesPublic from "../page/AllArticlesPublic";
import AllArticles from "../page/dashboardPages/AllArticles";
import Subscription from "../subscription/Subscription";
import Payment from "../subscription/Payment";
import PremiumArticle from "../page/PremiumArticle";
import AboutUs from "../page/AboutUs";
import ContactUs from "../page/ContactUs";
import VisitorMessage from "../page/dashboardPages/dashboardComponents/VisitorMessage";

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
        path: "all-articles",
        Component: AllArticlesPublic,
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "contact-us",
        Component: ContactUs,
      },
      {
        path: "user-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "payment/subscription",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "article-details/:id",
        element: (
          <PrivateRoute>
            <ArticleDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "subscription",
        element: (
          <PrivateRoute>
            <Subscription />
          </PrivateRoute>
        ),
      },
      {
        path: "premium-articles",
        element: (
          <PrivateRoute>
            <PremiumArticle />
          </PrivateRoute>
        ),
      },
      {
        path: "update-article",
        element: (
          <PrivateRoute>
            <UpdateArticle />
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
      { path: "visitor-messages", Component: VisitorMessage },
      { path: "user-profile", Component: MyProfile },
      {
        path: "add-articles",
        element: (
          <PrivateRoute>
            <AddArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "my-articles",
        element: (
          <PrivateRoute>
            <MyArticles />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
