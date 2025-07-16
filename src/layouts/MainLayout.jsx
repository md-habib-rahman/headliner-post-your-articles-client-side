import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import Aos from "aos";

const MainLayout = () => {
  useEffect(() => {
    Aos.init({
      duration: 700,
    });
  }, []);

  useEffect(() => {
    document.title = "HeadLiner | Best Articles";
   
  }, []);

  const { user, loading } = useAuth();
  if (loading) {
    return (
      <span className="loading loading-dots loading-xl flex items-center justify-center min-h-screen mx-auto"></span>
    );
  }
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
