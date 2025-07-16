import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import "aos/dist/aos.css";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router";

const ArticleComment = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  
  const onSubmit = async (data) => {
    if (!user) {
      Swal.fire("Oops!", "You must be logged in to comment", "warning");
      return;
    }
   

    const commentData = {
      articleId: id,
      commentText: data.comment,
      commentedBy: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      commentedAt: new Date().toISOString(),
    };

    const res = await axiosInstance.post("/article/comments", commentData);
    if (res.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Comment has been submitted",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8" data-aos="fade-up">
      <h3 className="text-lg font-semibold mb-4 text-primary">
        Leave a Comment
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <textarea
          {...register("comment", { required: "Comment is required" })}
          rows="4"
          className="textarea textarea-bordered w-full"
          placeholder="Write your comment here..."
        ></textarea>
        {errors.comment && (
          <p className="text-red-500 text-sm">{errors.comment.message}</p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
};

export default ArticleComment;
