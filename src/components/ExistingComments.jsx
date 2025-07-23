import React from "react";
import useAxiosInstanceSecure from "../api/axiosInstanceSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";

const ExistingComments = ({ id }) => {
  const axiosSecure = useAxiosInstanceSecure();

  const {
    data: comments = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [`articleComments${id}`],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/comments/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading Comments!</div>;
  console.log(comments);
  return (
    <div className="space-y-4">
      <p>Comments:</p>
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="bg-white p-4 rounded-xl shadow-md flex gap-4 items-start"
        >
          <img
            src={comment.photoURL}
            alt={comment.displayName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{comment.displayName}</h4>
              <span className="text-sm text-gray-400">
                {new Date(comment.commentedAt).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-700 mt-1">{comment.commentText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExistingComments;
