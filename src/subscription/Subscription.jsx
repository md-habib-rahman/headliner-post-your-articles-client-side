import React from "react";
import SubscriptionBanner from "./SubscriptionBanner";
import { MdFavoriteBorder } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import Payment from "./Payment";

const Subscription = () => {
  const { user } = useAuth();
  //   const navigate = useNavigate();

  //   const handleSubscription = () => {
  //     navigate(`/payment/subscription?email=${user?.email}`);
  //   };
  // console.log(user)

  return (
    <div >
      <SubscriptionBanner />

      <Payment user={user}/>
    </div>
  );
};

export default Subscription;
