import React from "react";
import SubscriptionBanner from "./SubscriptionBanner";

const Subscription = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <SubscriptionBanner />

      {/* Subscription Information */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            data-aos="fade-up"
            className="bg-white dark:bg-base-300 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold text-primary mb-2">
              Basic Plan
            </h3>
            <p className="text-sm text-base-content mb-4">
              Access to all articles with limited features.
            </p>
            <span className="text-xl font-bold text-primary mb-4">
              $9.99 / Month
            </span>
            <button className="btn btn-primary w-full">Subscribe</button>
          </div>
          <div
            data-aos="fade-up"
            className="bg-white dark:bg-base-300 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold text-primary mb-2">
              Standard Plan
            </h3>
            <p className="text-sm text-base-content mb-4">
              Access to premium articles and features.
            </p>
            <span className="text-xl font-bold text-primary mb-4">
              $19.99 / Month
            </span>
            <button className="btn btn-primary w-full">Subscribe</button>
          </div>
          <div
            data-aos="fade-up"
            className="bg-white dark:bg-base-300 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold text-primary mb-2">
              Premium Plan
            </h3>
            <p className="text-sm text-base-content mb-4">
              Full access to all articles, features, and priority support.
            </p>
            <span className="text-xl font-bold text-primary mb-4">
              $29.99 / Month
            </span>
            <button className="btn btn-primary w-full">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
