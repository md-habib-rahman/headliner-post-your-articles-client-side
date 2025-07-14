import React from "react";
import animationData from "../assets/Premium.json";
import Lottie from "lottie-react";
import "aos/dist/aos.css";
import useAuth from "../hooks/useAuth";

const SubscriptionBanner = ({ handleSubscription }) => {
  return (
    <div
    //   data-aos="flip-left"
      className="relative bg-neutral text-neutral-content p-12 rounded-lg shadow-lg"
    >
      <div className="absolute inset-0 z-0">
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-full h-full object-cover "
        />
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Unlock Premium Content</h1>
        <p className="text-lg mb-6">
          Get access to exclusive articles, premium content, and more.
        </p>
        <button
          onClick={handleSubscription}
          className="btn btn-secondary py-3 px-6 rounded-full"
        >
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
