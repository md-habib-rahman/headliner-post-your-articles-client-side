import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";
import { FiInfo, FiEdit } from "react-icons/fi";
import { MdCancel, MdDeleteForever, MdOutlineNotes } from "react-icons/md";
import { RiChatDeleteLine } from "react-icons/ri";
import DeclineMessageModal from "./DeclineMessageModal";
import Swal from "sweetalert2";
import { GrValidate } from "react-icons/gr";
import { BsClock } from "react-icons/bs";

const MyArticle = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    data: articles = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["userArticles"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/article/my-articles/?email=${user.email}`
      );
      return res.data;
    },
  });

  const handleDetailsClick = (id) => {
    navigate(`/article-details/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const alert = await Swal.fire({
        title: "Are you sure?",
        text: "This will permanently delete the article!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Yes, delete it!",
      });
      if (alert.isConfirmed) {
        const response = await axiosInstance.delete(
          `/my-articles/delete/${id}`
        );
        if (response.data.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Article deleted successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
      refetch();
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleUpdate = (article) => {
    navigate(`/update-article`, { state: { article: article } });
  };

  const openModal = (reason) => {
    setDeclineReason(reason);
    setModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading articles</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-primary mb-4 font-montserrat">
        My Articles
      </h2>

      <table className="table w-full table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Article Title</th>
            <th>Status</th>
            <th>Premium</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <tr key={article._id}>
                <td>{index + 1}</td>
                <td>
                  <p className="font-semibold">{article.title}</p>
                </td>
                <td>
                  {article.approvalStatus?.isApprove === true ? (
                    <span className="flex items-center gap-1 text-green-600">
                      Approve <GrValidate />
                    </span>
                  ) : article.approvalStatus?.isDecline === true ? (
                    <span className="flex items-center gap-1 text-red-600">
                      Declined <MdCancel />
                      <button
                        className="btn btn-xs btn-error ml-2"
                        onClick={() =>
                          openModal(article.approvalStatus?.declineMessage)
                        }
                      >
                        View Reason <RiChatDeleteLine />
                      </button>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-500">
                      Pending <BsClock />
                    </span>
                  )}
                </td>
                <td>{article.isPremium ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm mr-2"
                    onClick={() => handleDetailsClick(article._id)}
                  >
                    Details <FiInfo />
                  </button>
                  <button
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() => handleUpdate(article)}
                  >
                    Update <FiEdit />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(article._id)}
                  >
                    Delete <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-8">
                No articles found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {modalOpen && (
        <DeclineMessageModal
          message={declineReason}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  );
};

export default MyArticle;
