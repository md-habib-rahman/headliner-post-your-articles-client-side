import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Loader from "./Loader";
import { Link } from "react-router";
import "aos/dist/aos.css";

const AllPublisher = () => {
  const [showAll, setShowAll] = useState(false); // State to toggle between showing 12 or all publishers
  const [displayPublishers, setDisplayPublishers] = useState([]);

  const {
    data: publishers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const response = await axiosInstance.get("/publishers");
      return response.data;
    },
  });

  useEffect(() => {
    if (!showAll) {
      const newPublishers = publishers.slice(0, 8);
      setDisplayPublishers(newPublishers);
    } else if (showAll) {
      setDisplayPublishers(publishers);
    }
  }, [showAll, publishers]);

  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-center p-8">Error loading publishers</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 text-center">
      <h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2 font-montserrat"
        data-aos="fade-right"
      >
        All Publishers
      </h2>
      <p data-aos="fade-left" className="text-primary/60 mb-6">
        Explore All Trusted News Publishers
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 "
        data-aos="fade-up"
      >
        {displayPublishers.map((publisher) => (
          <div
            key={publisher._id}
            className="bg-white dark:bg-base-300 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            {/* Publisher Image */}
            <div className="w-full h-32 mb-4">
              <img
                src={publisher.image}
                alt={publisher.name}
                className="w-25 h-25 mx-auto object-cover rounded-md"
              />
            </div>

            {/* Publisher Name */}
            <h3 className="text-lg font-semibold text-center text-primary mb-2">
              <Link
                to="/all-articles"
                state={{ selectedPublisher: publisher.name }}
                className="hover:underline"
              >
                {publisher.name}
              </Link>
            </h3>
          </div>
        ))}
      </div>
      <div className="text-right">
        <button
          onClick={() => setShowAll((prv) => !prv)}
          className="  mt-6 cursor-pointer hover:underline"
        >
          {!showAll ? "Show All Publishers" : "Show Less"}
        </button>
      </div>
    </div>
  );
};

export default AllPublisher;
