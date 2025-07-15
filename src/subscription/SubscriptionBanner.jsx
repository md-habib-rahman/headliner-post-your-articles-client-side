import React from "react";
import "aos/dist/aos.css";
import lottieAnimation from "../assets/news.json";
import Lottie from "lottie-react";

const SubscriptionBanner = () => {
  return (
    <div
      className="bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white py-12 md:px-20  shadow-2xl  relative md:h-80 lg:h-120 flex items-center justify-center mb-12"
      data-aos="fade-up"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center ">
          <h2 className="text-2xl md:text-5xl font-bold mb-3 font-montserrat">
            Stay Ahead with the <br />
            Latest News!
          </h2>
          <p className="text-md md:text-lg text-gray-200">
            Subscribe now and never miss a breaking story. 
          </p>
        </div>
      </div>
      <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
        <Lottie animationData={lottieAnimation} loop={true} speed={0.1} />
      </div>
    </div>
  );
};

export default SubscriptionBanner;
