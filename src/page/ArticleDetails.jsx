import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import axiosInstance from "../api/axiosInstance";

const ArticleDetails = () => {
  const { id } = useParams();

  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`articleDetails${id}`],
    queryFn: async () => {
      const res = await axiosInstance.get(`/article-details/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center p-8">Loading...</div>;
  if (isError)
    return <div className="text-center p-8">Error loading article</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-base-300 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-3xl font-bold text-primary mb-4">
          {article.title}
        </h2>
        <div className="flex justify-between text-sm text-base-content mb-4">
          <span>{article.publisher}</span>
          <span>Published: {new Date(article.createdAt).toLocaleString()}</span>
        </div>

        <img
          src={article.imageUrl}
          alt={article.title}
          className="rounded-lg w-full object-cover mb-6"
        />
        <div className="text-base-content">
          <h3 className="text-xl font-semibold text-primary mb-2">Tags:</h3>
          <div className="flex space-x-2">
            {article.tags.map((tag, index) => (
              <span key={index} className="badge badge-outline  badge-success text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-base-content mt-6">
          <p>{article.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
