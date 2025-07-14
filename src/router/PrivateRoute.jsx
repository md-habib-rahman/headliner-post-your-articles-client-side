import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <span className="loading loading-dots loading-xl flex items-center justify-center min-h-screen mx-auto"></span>
    );
  }
  if (!user) {
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }}></Navigate>
    );
  }
  return children;
};

export default PrivateRoute;
