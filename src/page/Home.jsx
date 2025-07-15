import React from "react";
import PaymentCards from "../components/PaymentCards";
import HeroBanner from "../components/HeroBanner";
import AllPublisher from "../components/AllPublisher";

const Home = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <HeroBanner />
        <PaymentCards />
        <AllPublisher />
      </div>
    </>
  );
};

export default Home;
