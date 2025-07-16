import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import Loader from "../components/Loader";
import { BiCategoryAlt } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { PrimaryButton, PrimaryLink } from "../components/Buttons";
import { FaCrown } from "react-icons/fa";
import ErrorPage from "./ErrorPage";
import useUserRole from "../hooks/useUserRole";
import notFound from '../assets/not found.json'
import Lottie from "lottie-react";

const PremiumArticle = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { role, isLoading: roleLoading, error } = useUserRole();

  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["premiumArticles"],
    queryFn: async () => {
      const response = await axiosInstance.get("/articles/premium", {
        params: { isPremium: true },
      });
      return response.data;
    },
  });

  if (role !== "premium") {
    return (
      <div className="text-center p-8">
		<Lottie animationData={notFound} className="w-96 mx-auto" loop={true}></Lottie>
        <h2 className="text-xl font-bold">You are not allowed</h2>
        <PrimaryLink className="mt-4" to="/">
          Go to Home
        </PrimaryLink>
      </div>
    );
  }

  const handleDetails = (id) => {
    navigate(`/article-details/${id}`, {
      state: { from: "allArticles" },
    });
  };
  // Set articles data when fetched
  //   if (data) {
  //     setArticles(data);
  //   }
  if (roleLoading) return <div className="text-center p-8">Checking...</div>;
  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-center p-8">Error loading articles</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Premium Articles</h2>

      {/* Articles Cards */}
      <div className="flex flex-wrap gap-6">
        {articles.map((article, index) => {
          const iswide = index % 5 === 0;
          return (
            <div
              key={article._id}
              className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 flex-grow
					${iswide ? "basis-full sm:basis-[65%]" : "basis-full sm:basis-[31%]"}
					${
            article.isPremium
              ? "bg-secondary/20 border-2 border-secondary"
              : "bg-base-300"
          }`}
              data-aos="fade-up"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-50 object-cover object-top rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-base-content mb-2">
                {article.description.slice(0, 100)}
                ...
              </p>
              <div className="flex justify-between text-sm text-base-content mb-4">
                <span className="text-accent-content italic flex items-center gap-2">
                  <BiCategoryAlt /> {article.publisher}
                </span>
                <span className="flex items-center gap-2">
                  <LuCalendarDays />{" "}
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                {
                  <PrimaryButton
                    onClick={() => handleDetails(article._id)}
                    to={``}
                  >
                    Details
                  </PrimaryButton>
                }

                {article.isPremium && (
                  <span className="badge badge-warning">
                    Premium <FaCrown />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PremiumArticle;
