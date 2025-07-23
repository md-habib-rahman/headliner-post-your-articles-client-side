import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import axiosInstance from "../api/axiosInstance";
import ArticleComment from "../components/ArticleComment";
import ExistingComments from "../components/ExistingComments";

const ArticleDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const previousRoute = location.state?.from;

    if (previousRoute === "allArticles") {
      axiosInstance.patch(`/article/update-view/${id}`);
      console.log("view updated");
    }
  }, [id, location]);

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
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-base-300 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-3xl font-bold text-primary mb-4">
          {article.title}
        </h2>
        <div className="flex justify-between text-sm text-base-content mb-4">
          <span className="font-semibold text-xl text-neutral-500">
            {article.publisher}
          </span>
          <span className="text-neutral-500">
            Published: {new Date(article.createdAt).toLocaleString()}
          </span>
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
              <span
                key={index}
                className="badge badge-outline  badge-success text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <span className="italic text-neutral-400 flex gap-2">
            Article Written by:
            <p className="not-italic badge badge-secondary badge-outline">
              {article.createdBy}
            </p>
          </span>
        </div>
        <div className="text-base-content mt-6">
          {article.description.split("\n").map((line, index) => (
            <p key={index} className="mb-4 max-w-3xl mx-auto">
              {line}
            </p>
          ))}
        </div>
      </div>
      <ExistingComments id={id} />
      <ArticleComment id={id} />
    </div>
  );
};

export default ArticleDetails;
