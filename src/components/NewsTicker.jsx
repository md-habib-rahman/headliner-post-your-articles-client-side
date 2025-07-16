import { useQuery } from "@tanstack/react-query";
import React from "react";
import Marquee from "react-fast-marquee";
import { MdAnnouncement } from "react-icons/md";
import axiosInstance from "../api/axiosInstance";
import { FcNews } from "react-icons/fc";

const NewsTicker = () => {
  const {
    data: headlines = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tickerTexts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/news/tickers");
      return res.data;
    },
  });

  return (
    <div className="bg-yellow-100 border-b border-yellow-300 py-2 px-4 flex items-center gap-4 custom-z ">
      <FcNews className=" text-xl animate-pulse custom-z" />
      <Marquee pauseOnHover gradient={false} speed={50}>
        {headlines.map((headline, index) => (
          <span key={index} className="mx-6 font-medium text-gray-800 custom-z">
            📰 {headline}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default NewsTicker;
