import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <span className="loading loading-dots loading-xl flex items-center justify-center min-h-screen mx-auto"></span>
    );
  }
  if (!user) {
    return <Navigate to="/auth/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
