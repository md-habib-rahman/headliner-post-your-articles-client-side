import React from "react";
import { MdFavoriteBorder } from "react-icons/md";

const PaymentCards = () => {
  return (
    <div className="py-12 px-12 text-center">
      <h2 className="text-3xl font-bold text-primary mb-4 font-montserrat">
        Choose Your Plan
      </h2>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-6">
        <div
          data-aos="fade-up"
          className="bg-base-300 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold text-primary mb-2 font-montserrat">
            Basic Plan
          </h3>
          <p className="text-sm text-base-content mb-4">
            Access to all articles with limited features.
          </p>
          <span className="text-xl font-bold text-primary mb-4">
            $0.99 / 1 Minute
          </span>
          <button className="btn btn-primary w-full">Subscribe</button>
        </div>
        <div
          data-aos="fade-up"
          className="bg-secondary/60 p-6 rounded-lg shadow-lg relative"
        >
          <h3 className="text-xl font-semibold text-primary mb-2 font-montserrat">
            Standard Plan
          </h3>
          <p className="text-sm text-base-content mb-4">
            Access to premium articles and features.
          </p>
          <span className="text-xl font-bold text-primary mb-4">
            $19.99 / 5 Days
          </span>
          <span className="badge absolute top-0 -translate-y-1/2 -right-2 rounded-full badge-secondary">
            Popular <MdFavoriteBorder />
          </span>
          <button className="btn btn-primary w-full">Subscribe</button>
        </div>
        <div
          data-aos="fade-up"
          className="bg-base-300 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold text-primary mb-2 font-montserrat">
            Premium Plan
          </h3>
          <p className="text-sm text-base-content mb-4">
            Full access to all articles, features, and priority support.
          </p>
          <span className="text-xl font-bold text-primary mb-4">
            $29.99 / 10 Days
          </span>
          <button className="btn btn-primary w-full">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCards;
