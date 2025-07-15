import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { FaFileAlt, FaNewspaper, FaUsers, FaUserShield } from "react-icons/fa";
import { RiShieldCheckFill } from "react-icons/ri";
import "aos/dist/aos.css";

const Statistics = () => {
  //   const [stats, setStats] = useState({
  //     totalUsers: 0,
  //     normalUsers: 0,
  //     premiumUsers: 0,
  //   });

  const {
    data: stats = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["headLinerStats"],
    queryFn: async () => {
      const response = await axiosInstance.get("/stats");
      return response.data;
    },
  });

  //   useEffect(() => {
  //     if (data) {
  //       setStats(data); // Set the statistics from the backend
  //     }
  //   }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching statistics</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 mb-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-8 text-center font-montserrat">
        Our Impact in Numbers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Total Users */}
        <div
          className="bg-base-300 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          data-aos="fade-right"
        >
          <div className="flex items-center mb-4" data-aos="fade-right">
            <FaUsers className="text-4xl text-primary mr-4" />
            <h3 className="text-xl font-semibold text-primary">Total Users</h3>
          </div>
          <p className="text-2xl font-bold text-primary">
            <CountUp
              enableScrollSpy={true}
              scrollSpyOnce={false}
              scrollSpyDelay={true}
              start={0}
              duration={5}
              end={stats.totalUsers}
            />
          </p>
        </div>

        {/* Normal Users */}
        <div
          className="bg-white dark:bg-base-300 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          data-aos="fade-right"
        >
          <div className="flex items-center mb-4" data-aos="fade-right">
            <FaUsers className="text-4xl text-primary mr-4" />
            <h3 className="text-xl font-semibold text-primary">Normal Users</h3>
          </div>
          <p className="text-2xl font-bold text-primary">
            <CountUp
              enableScrollSpy={true}
              scrollSpyOnce={false}
              scrollSpyDelay={true}
              start={0}
              duration={5}
              end={stats.normalUsers}
            />
          </p>
        </div>

        {/* Premium Users */}
        <div
          className="bg-secondary/60 border-2 border-secondary p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          data-aos="flip-left"
        >
          <div className="flex items-center mb-4" data-aos="flip-left">
            <FaUserShield className="text-4xl text-primary mr-4" />
            <h3 className="text-xl font-semibold text-primary">
              Premium Users
            </h3>
          </div>
          <p className="text-2xl font-bold text-primary">
            <CountUp
              enableScrollSpy={true}
              scrollSpyOnce={false}
              scrollSpyDelay={true}
              start={0}
              duration={5}
              end={stats.premiumUsers}
            />
          </p>
        </div>

        {/* Total Articles */}
        <div
          className="bg-white dark:bg-base-300 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          data-aos="fade-left"
        >
          <div className="flex items-center mb-4" data-aos="fade-left">
            <FaNewspaper className="text-4xl text-primary mr-4" />
            <h3 className="text-xl font-semibold text-primary">
              Total Articles
            </h3>
          </div>
          <p className="text-2xl font-bold text-primary">
            <CountUp
              enableScrollSpy={true}
              scrollSpyOnce={false}
              scrollSpyDelay={true}
              start={0}
              duration={5}
              end={stats.allArticles}
            />
          </p>
        </div>

        {/* Premium Articles */}
        <div
          className="bg-base-300 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          data-aos="fade-left"
        >
          <div className="flex items-center mb-4" data-aos="fade-left">
            <RiShieldCheckFill className="text-4xl text-primary mr-4" />
            <h3 className="text-xl font-semibold text-primary">
              Premium Articles
            </h3>
          </div>
          <p className="text-2xl font-bold text-primary">
            <CountUp
              enableScrollSpy={true}
              scrollSpyOnce={false}
              scrollSpyDelay={true}
              start={0}
              duration={5}
              end={stats.premiumArticles}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
