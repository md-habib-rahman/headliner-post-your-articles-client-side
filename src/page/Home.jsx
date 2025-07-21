import React, { useEffect, useState } from "react";
import PaymentCards from "../components/PaymentCards";
import HeroBanner from "../components/HeroBanner";
import AllPublisher from "../components/AllPublisher";
import Statistics from "../components/Statistics";
import NewsTicker from "../components/NewsTicker";
import ArticleCommentsSlide from "../components/ArticleCommentsSlide";
import useUserRole from "../hooks/useUserRole";
import Subscription from "../subscription/Subscription";
import SubscriptionModal from "../components/SubscriptionModal";
import DeclineModal from "./dashboardPages/dashboardComponents/DeclineModal";
import useAuth from "../hooks/useAuth";
import { setAccessToken } from "../js/authToken";

const Home = () => {
  const { role } = useUserRole();
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (role !== "premium") {
      setTimeout(() => {
        setShowModal(true);
      }, 10000);
    }
  }, [role]);

//   useEffect(() => {
//     if (user) {
//       const accessToken = user?.accessToken;
//         setAccessToken(accessToken);
//     }
//   }, [user]);

//   console.log(showModal);
  return (
    <>
      <div className="max-w-7xl mx-auto  ">
        <HeroBanner />
        <NewsTicker />
        <PaymentCards />
        <AllPublisher />
        <Statistics />
        <ArticleCommentsSlide />
        {showModal && <SubscriptionModal setShowModal={setShowModal} />}
      </div>
    </>
  );
};

export default Home;
