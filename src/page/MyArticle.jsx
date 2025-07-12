import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";
import { FiInfo, FiEdit } from "react-icons/fi";
import { MdDeleteForever, MdOutlineNotes } from "react-icons/md";
import { RiChatDeleteLine } from "react-icons/ri";
import DeclineMessageModal from "./DeclineMessageModal";

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
    navigate(`/article/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/articles/${id}`);
      if (response.status === 200) {
        alert("Article deleted successfully");
        // Refresh the list of articles
      }
    } catch (error) {
      console.error("❌ Error deleting article:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-article/${id}`);
  };

  const openModal = (reason) => {
    setDeclineReason(reason);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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
                <td>{article.title}</td>
                <td>
                  {article.approvalStatus[0].isApprove === true ? (
                    "Approved"
                  ) : article.approvalStatus[1].isDecline === true ? (
                    <span>
                      Declined
                      <button
                        className="btn btn-xs btn-error ml-2"
                        onClick={() =>
                          openModal(article.approvalStatus[2].declineMessage)
                        }
                      >
                        View Reason <RiChatDeleteLine />
                      </button>
                    </span>
                  ) : (
                    "Pending"
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
                    onClick={() => handleUpdate(article._id)}
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
