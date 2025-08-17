import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import "aos/dist/aos.css";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { FaArrowRight } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router";

const plans = [
  {
    title: "Basic Plan",
    features: ["Test Your subscription", "Check the features"],
    price: "$0.99 / Day",
  },
  {
    title: "Standard Plan",
    features: ["Full access to all articles", "Post unlimited Articles"],
    price: "$19.99 / 5 Days",
  },
  {
    title: "Premium Plan",
    features: ["Full access to all articles", "Post unlimited Articles"],
    price: "$29.99 / 10 Days",
  },
];

const PaymentCards = () => {
  const naviagate = useNavigate();
  const handleClick = () => {
    naviagate("/subscription");
  };
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
        {plans.map((plan, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className={`p-6 rounded-lg shadow-lg ${
              index === 1 ? "bg-warning" : "bg-base-200"
            }`}
          >
            <h3 className="text-xl font-semibold text-primary mb-2 font-montserrat">
              {plan.title}
            </h3>
            {plan.features.map((feature, idx) => (
              <p
                key={idx}
                className="text-sm text-base-content flex items-center gap-2 justify-center"
              >
                <FaArrowRight />
                {feature}
              </p>
            ))}

            <p className="text-xl font-bold text-primary pt-4 ">{plan.price}</p>
            <PrimaryButton className="w-full mt-4 " onClick={handleClick}>
              Subscribe
            </PrimaryButton>
            {index === 1 && (
              <span className="badge absolute top-0 -translate-y-1/2 -right-2 rounded-full badge-secondary">
                Popular <MdFavoriteBorder />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentCards;
