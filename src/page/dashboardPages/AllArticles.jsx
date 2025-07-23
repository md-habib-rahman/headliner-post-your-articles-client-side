import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
import { PrimaryButton, SecondaryButton } from "../../components/Buttons";
import useAuth from "../../hooks/useAuth";
import {
  FaCheckCircle,
  FaCrown,
  FaTimesCircle,
  FaTrashAlt,
} from "react-icons/fa";
import DeclineModal from "./dashboardComponents/DeclineModal";
import useAxiosInstanceSecure from "../../api/axiosInstanceSecure";
import Loader from "../../components/Loader";

const AllArticles = () => {
  const { user: currentUser } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [articleCount, setArticleCount] = useState(0);
  const axiosSecure = useAxiosInstanceSecure();
  //   const [itemsPerPage, setItemsPerPage] = useState(5);
  // Fetch Users

  axiosSecure.get("/articles/count").then((res) => {
    console.log(res.data);
    setArticleCount(res.data);
  });
  const {
    data: articles = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["articleWithUser"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles-with-users", {
        params: { currentPage, itemsPerPage },
      });
      return res.data;
    },
  });

  //   console.log(data);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  //   const totalArticles = articles.length;
  const itemsPerPage = 5;
  const numberOfPages = Math.ceil(articleCount / itemsPerPage);
  const pages = [
    ...Array(numberOfPages)
      .keys()
      .map((i) => i + 1),
  ];

  const { data: publisher = [] } = useQuery({
    queryKey: ["publisher"],
    queryFn: async () => {
      const res = await axiosInstance.get("/publishers");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the article!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/article/${id}`);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Article deleted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    refetch();
  };

  const handleMakePremium = async (id) => {
    console.log("button clicked");
    const resutl = await axiosSecure.patch(`/make-premium/${id}`);
    if (resutl.data.modifiedCount === 1) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Article converted to premium!",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
    // console.log("Make Premium button clicked");
  };
  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Article will be approved!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#09213e",
      confirmButtonText: "Yes, approve it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.patch(
          `/article/allow-approval/${id}`
        );
        if (response.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Article approved successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          console.log(response.data);
        }
      } catch (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    refetch();
  };

  const handleDecline = (article) => {
    setSelectedArticleId(article._id);
    setModalOpen(true);
    // console.log("clicked");
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  //   console.log(articles[0]?.approvalStatus);

  //    Swal.fire({
  //             position: "top-end",
  //             icon: "success",
  //             title: "User role changed!",
  //             showConfirmButton: false,
  //             timer: 1500,

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading users.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 font-montserrat">All Articles</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full min-w-[800px]">
          <thead>
            <tr>
              <th>#</th>
              <th>Article Title</th>
              <th>Author Info</th>

              <th>Post Date</th>
              <th>Approval Status</th>
              <th>Publisher</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, idx) => (
              <tr key={article._id}>
                <td>{idx + 1}</td>
                <td>
                  <p className="lg:w-[150px] xl:w-[200px] font-semibold">
                    {article.title}
                  </p>
                </td>
                <td>
                  <div className="avatar">
                    <div className="w-10 rounded-full mr-2">
                      <img
                        src={article?.articleWithUserInfo?.photoURL}
                        alt=""
                      />
                    </div>
                  </div>
                  <span className="font-semibold">
                    {article?.articleWithUserInfo?.name}
                  </span>
                  <span className="badge badge-soft badge-success text-xs mt-1">
                    {article?.articleWithUserInfo?.email}
                  </span>
                </td>

                <td>{new Date(article?.createdAt).toLocaleString()}</td>
                <td>
                  <p>
                    {article?.approvalStatus?.isApprove
                      ? "Approved"
                      : "Not Approved"}
                  </p>
                  <p className="bg-red-500 text-center rounded-2xl text-base-100 text-xs mt-1">
                    {article?.approvalStatus?.isDecline && "Declined"}
                  </p>
                </td>
                <td>{article?.publisher}</td>
                <td>
                  <div className="space-y-2 flex gap-2">
                    <div className="tooltip" data-tip="Approve">
                      <button
                        className="btn rounded-xl"
                        onClick={() => handleApprove(article._id)}
                      >
                        <FaCheckCircle />
                      </button>
                    </div>
                    <div className="tooltip" data-tip="Decline">
                      <button
                        className="btn rounded-xl"
                        onClick={() => handleDecline(article)}
                      >
                        <FaTimesCircle />
                      </button>
                    </div>
                    <div className="tooltip" data-tip="Delete">
                      <button
                        className="btn rounded-xl"
                        onClick={() => handleDelete(article._id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                    <div className="tooltip" data-tip="Make Premium">
                      <button
                        onClick={() => handleMakePremium(article._id)}
                        className={`${
                          article.isPremium && "btn-disabled"
                        } btn rounded-xl`}
                      >
                        <FaCrown className="text-secondary" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <DeclineModal
          setModalOpen={setModalOpen}
          articleId={selectedArticleId}
          refetch={refetch}
        />
      )}
      <div className="flex justify-center my-4 gap-4">
        <button className="btn" onClick={handlePrevPage}>
          Pre
        </button>
        {pages.map((page) => (
          <button
            className={`${currentPage === page ? "btn-primary btn" : "btn"}`}
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page}
          </button>
        ))}
        <button className="btn" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AllArticles;
