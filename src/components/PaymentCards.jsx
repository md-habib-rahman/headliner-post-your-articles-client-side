import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import "aos/dist/aos.css";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { FaArrowRight } from "react-icons/fa";
import { Typewriter } from 'react-simple-typewriter'

const PaymentCards = () => {
  return (
    <div className="py-18  text-center max-w-7xl mx-auto">
      <h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary  font-montserrat"
        data-aos="fade-right"
      >
        Choose Your Plan
      </h2>
      <p data-aos="fade-left" className="mb-12 text-primary/60">
        Subscribe now and never miss a breaking story
      </p>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-6 mx-8 ">
        <div
          data-aos="fade-right"
          className="bg-base-300 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold text-primary mb-2 font-montserrat">
            Basic Plan
          </h3>
           <p className="text-sm text-base-content flex items-center gap-2 justify-center">
            <FaArrowRight />
            Test Your subscription
          </p>{" "}
          <p className="text-sm text-base-content flex items-center gap-2 justify-center mb-4">
            <FaArrowRight />
            Check the features
          </p>
          <span className="text-xl font-bold text-primary  ">
            $0.99 / 1 Minute
          </span>
          <PrimaryButton className="w-full mt-4">Subscribe</PrimaryButton>
        </div>
        <div
          data-aos="fade-up"
          className="bg-secondary/60 p-6 rounded-lg shadow-lg relative"
        >
          <h3 className="text-xl font-semibold text-primary mb-2 font-montserrat">
            Standard Plan
          </h3>
          <p className="text-sm text-base-content flex items-center gap-2 justify-center">
            <FaArrowRight />
            Full access to all articles
          </p>{" "}
          <p className="text-sm text-base-content flex items-center gap-2 justify-center mb-4">
            <FaArrowRight />
            Post unlimited Articles
          </p>
          <span className="text-xl font-bold text-primary mb-4">
            $19.99 / 5 Days
          </span>
          <span className="badge absolute top-0 -translate-y-1/2 -right-2 rounded-full badge-secondary">
            Popular <MdFavoriteBorder />
          </span>
          <PrimaryButton className="w-full mt-4">Subscribe</PrimaryButton>
        </div>
        <div
          data-aos="fade-left"
          className="bg-base-300 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold text-primary mb-2 font-montserrat">
            Premium Plan
          </h3>
          <p className="text-sm text-base-content flex items-center gap-2 justify-center">
            <FaArrowRight />
            Full access to all articles
          </p>{" "}
          <p className="text-sm text-base-content flex items-center gap-2 justify-center mb-4">
            <FaArrowRight />
            Post unlimited Articles
          </p>
          <span className="text-xl font-bold text-primary mb-4">
            $29.99 / 10 Days
          </span>
          <PrimaryButton className="w-full mt-4">Subscribe</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default PaymentCards;
