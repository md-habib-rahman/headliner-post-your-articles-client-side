import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "../api/axiosInstance";
import { useParams } from "react-router";

const PublisherArticles = () => {
  const { name } = useParams(); 

  const {
    data: articles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["publisherArticles", name],
    queryFn: async () => {
      const response = await axiosInstance.get(`/articles/publisher/${name}`);
      return response.data;
    },
  });

  if (isLoading) return <div className="text-center p-8">Loading...</div>;
  if (isError)
    return <div className="text-center p-8">Error loading articles</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Articles by Publisher
      </h2>

      {/* Articles List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {articles.map((article) => (
          <div
            key={article._id}
            className="bg-white dark:bg-base-300 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold text-primary mb-2">
              {article.title}
            </h3>
            <p className="text-sm text-base-content mb-4">
              {article.description.slice(0, 100)}...
            </p>
            <Link
              to={`/article/${article._id}`}
              className="btn btn-sm btn-primary w-full"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublisherArticles;
