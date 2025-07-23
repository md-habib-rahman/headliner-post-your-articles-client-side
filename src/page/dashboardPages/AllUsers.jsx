import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import axiosInstance from "../../api/axiosInstance";
// import axios from "axios";
import { PrimaryButton } from "../../components/Buttons";
import useAuth from "../../hooks/useAuth";
import useAxiosInstanceSecure from "../../api/axiosInstanceSecure";

const AllArticles = () => {
  const { user: currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersCount, setUsersCount] = useState(0);
  const axiosSecure = useAxiosInstanceSecure();

  const fetchUsersCount = async () => {
    try {
      const res = await axiosSecure.get("/users/count");
    //   console.log(res.data);
      setUsersCount(res.data);
    } catch (error) {
    //   console.error("Error fetching user count:", error);
    }
  };

  useEffect(() => {
    fetchUsersCount();
  }, []);
  // Fetch Users
  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: { currentPage, itemsPerPage },
      });
      return res.data;
    },
  });

  const itemsPerPage = 5;
  const numberOfPages = Math.ceil(usersCount / itemsPerPage);
  const pages = [
    ...Array(numberOfPages)
      .keys()
      .map((i) => i + 1),
  ];
  useEffect(() => {
    refetch();
  }, [currentPage]);

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

  const updateRole = async (role, email) => {
    const result = await axiosSecure.patch(`/users/role/${email}`, {
      role: role,
    });
    return result.status;
  };

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: `Make ${user.name} an Admin?`,

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin",
    }).then((result) => {
      if (result.isConfirmed) {
        const res = updateRole("admin", user.email);
        if (res.status === 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User role changed!",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "User role failed to change!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 font-montserrat">All Users</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user.photoURL} alt="" />
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>
                  {user.email}{" "}
                  {user.email === currentUser.email && (
                    <span className="badge badge-soft badge-secondary">
                      You
                    </span>
                  )}
                </td>
                <td>{user.role || "user"}</td>
                <td>
                  {user.role !== "admin" ? (
                    <PrimaryButton onClick={() => handleMakeAdmin(user)}>
                      Make Admin
                    </PrimaryButton>
                  ) : (
                    <span className="badge badge-success">Admin</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
  );
};

export default AllArticles;
