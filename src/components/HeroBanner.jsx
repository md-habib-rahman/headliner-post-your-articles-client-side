import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Loader from "./Loader";
import ArticleSlider from "./ArticleSlider";

const HeroBanner = () => {
  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trendingArticles"],
    queryFn: async () => {
      const response = await axiosInstance.get("/articles/trending");
      return response.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center p-8">Error loading trending articles</div>
    );

  return (
    <div className=" ">
     
      <ArticleSlider articles={articles}></ArticleSlider>
    </div>
  );
};

export default HeroBanner;
