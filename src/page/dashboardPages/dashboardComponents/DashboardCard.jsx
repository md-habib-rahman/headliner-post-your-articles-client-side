import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import useAxiosInstanceSecure from "../../../api/axiosInstanceSecure";

const DashboardCard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [articleCount, setArticleCount] = useState(0);
  const [premiumArticleCount, setPremiumArticleCount] = useState(0);
  const axiosSecure = useAxiosInstanceSecure();

  axiosSecure.get("/articles/count").then((res) => {
    console.log(res.data);
    setArticleCount(res.data);
  });
  axiosSecure.get("/users/count").then((res) => {
    console.log(res.data);
    setUsersCount(res.data);
  });
  axiosSecure.get("/article/premium/count").then((res) => {
    console.log(res.data);
    setPremiumArticleCount(res.data);
  });

  return (
    <div className="w-full flex gap-8 justify-around">
      <div className="shadow-xl rounded-xl p-8">
        <h2>Total Users</h2>
        <div className="flex justify-between  items-center">
          <img
            className="w-10"
            src="https://i.ibb.co/jZf74p9g/User-avatar-svg.png"
            alt=""
          />
          <p className="text-5xl font-bold text-primary">{usersCount}</p>
        </div>
      </div>
      <div className="shadow-xl rounded-xl p-8 ">
        <h2>Total Articles</h2>
        <div className="flex justify-between  items-center">
          <img
            className="w-10"
            src="https://i.ibb.co/RGWXDnVc/1627965-200.png"
            alt=""
          />
          <p className="text-5xl font-bold mt-4 text-primary">{articleCount}</p>
        </div>
      </div>
      <div className="shadow-xl rounded-xl p-8">
        <h2>Total Premium Users</h2>
        <div className="flex justify-between  items-center">
          <img
            className="w-10"
            src="https://i.ibb.co/N64nrCXW/1162292.png"
            alt=""
          />
          <p className="text-5xl font-bold mt-4 text-primary">{premiumArticleCount}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
