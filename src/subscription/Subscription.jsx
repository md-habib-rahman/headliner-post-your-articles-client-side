import React, { useEffect, useState } from "react";
import SubscriptionBanner from "./SubscriptionBanner";
import { MdFavoriteBorder } from "react-icons/md";
import useAuth from "../hooks/useAuth";
// import { useLocation, useNavigate } from "react-router";
import Payment from "./Payment";

const Subscription = () => {
  const { user } = useAuth();
  //   const location = useLocation();
  //   const [selected, setSelected] = useState("");

  //   console.log(location?.state?.selectedOption);
  //   useEffect(() => {
  //     if (location?.state?.selectedOption) {
  //       setSelected(location?.state?.selectedOption);
  //     }
  //   }, [location.state]);

  return (
    <div>
      <SubscriptionBanner />

      <Payment />
    </div>
  );
};

export default Subscription;
