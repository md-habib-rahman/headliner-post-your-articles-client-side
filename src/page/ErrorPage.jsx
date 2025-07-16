import React, { useEffect } from "react";
import notFoundAnimation from "../assets/Error Lottie.json";
import Lottie from "lottie-react";
import { Link } from "react-router";

const ErrorPage = () => {
  useEffect(() => {
    document.title = "HeadLiner | Error";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-500 text-center ">
      <div className=" w-full">
        <Lottie
          animationData={notFoundAnimation}
          loop={true}
          className="w-full h-96 mx-auto"
        />

        <h1 className="text-4xl font-bold  text-base-100">Page Not Found</h1>
        <p className="mt-2 text-base-200 ">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-xl shadow-md hover:bg-indigo-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
