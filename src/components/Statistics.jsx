import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { FaFileAlt, FaNewspaper, FaUsers, FaUserShield } from "react-icons/fa";
import { RiShieldCheckFill } from "react-icons/ri";
import "aos/dist/aos.css";

const stats = [
  {
    icon: (
      <FaUsers className="text-primary text-4xl hover:scale-150 transition-all duration-300" />
    ),
    value: 150,
    label: "Total Users",
  },
  {
    icon: (
      <FaUserShield className="text-primary text-4xl hover:scale-150 transition-all duration-300" />
    ),
    value: 50,
    label: "Premium Users",
  },
  {
    icon: (
      <FaNewspaper className="text-primary text-4xl hover:scale-150 transition-all duration-300" />
    ),
    value: 1200,
    label: "Total Articles",
  },
  {
    icon: (
      <RiShieldCheckFill className="text-primary text-4xl hover:scale-150 transition-all duration-300" />
    ),
    value: 350,
    label: "Premium Articles",
  },
];

const Statistics = () => {
//   const {
//     data: stats = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["headLinerStats"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/stats");
//       return response.data;
//     },
//   });

  //   useEffect(() => {
  //     if (data) {
  //       setStats(data); // Set the statistics from the backend
  //     }
  //   }, [data]);

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error fetching statistics</div>;

  return (
    <section className="bg-base-100 py-16">
      {" "}
     
      <div className="max-w-7xl mx-auto px-6">
        {" "}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="transition-transform duration-300 hover:scale-105"
            >
              <div className="flex justify-center mb-5">
                <div
                  className="p-8 border-2  border-primary rounded-3xl flex items-center justify-center bg-base-200 text-secondary shadow-md"
                  
                >
                  {React.cloneElement(stat.icon, {
                    size: 48,
                    className: "text-secondary",
                  })}
                </div>
              </div>
              <h3 className="text-5xl font-extrabold text-primary mb-2 select-none">
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  enableScrollSpy={true}
                  scrollSpyOnce={false}
                />
              </h3>
              <p className="text-base-content text-lg font-medium tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
