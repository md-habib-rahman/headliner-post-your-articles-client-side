import React from "react";
import PaymentCards from "../components/PaymentCards";
import HeroBanner from "../components/HeroBanner";
import AllPublisher from "../components/AllPublisher";
import Statistics from "../components/Statistics";
import NewsTicker from "../components/NewsTicker";

const Home = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <NewsTicker />
        <HeroBanner />
        <PaymentCards />
        <AllPublisher />
        <Statistics />
      </div>
    </>
  );
};

export default Home;
