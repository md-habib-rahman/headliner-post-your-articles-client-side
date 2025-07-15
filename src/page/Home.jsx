import React from "react";
import PaymentCards from "../components/PaymentCards";
import HeroBanner from "../components/HeroBanner";

const Home = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <HeroBanner />
        <PaymentCards />
      </div>
    </>
  );
};

export default Home;
