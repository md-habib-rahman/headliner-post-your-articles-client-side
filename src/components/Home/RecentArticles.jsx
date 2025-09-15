import React from "react";
import axiosInstance from "../../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaCrown } from "react-icons/fa";

const RecentArticles = () => {
  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recentArticles"],
    queryFn: async () => {
      const res = await axiosInstance.get("/recent-articles");
      return res.data;
    },
  });

  console.log(articles);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-secondary">Error loading articles</p>;
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          className="flex flex-col justify-center"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">Latest News</h2>
          <p className="text-gray-500 max-w-md">
            Freshly published articles, handpicked for you. Stay updated with
            the newest insights, news, and stories as they arrive.
          </p>
        </div>

        <div
          className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          {articles.map((article) => (
            <div
              key={article._id}
              className="border-b border-base-300 pb-4 hover:shadow-md transition duration-300"
            >
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <Link to={`/article-details/${article._id}`}>
                <h3 className="font-semibold text-lg line-clamp-2 hover:text-secondary hover:underline text-primary">
                  {article.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {article.description}
              </p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-400">
                  {article.publisher}
                </span>
                {article.isPremium && <FaCrown className="text-warning" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentArticles;
