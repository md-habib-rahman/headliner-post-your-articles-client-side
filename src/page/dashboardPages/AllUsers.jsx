import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
import { PrimaryButton } from "../../components/Buttons";
import useAuth from "../../hooks/useAuth";

const AllUsers = () => {
  const { user: currentUser } = useAuth();
  // Fetch Users
  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users");
      return res.data;
    },
  });

  const updateRole = async (role, email) => {
    const result = await axiosInstance.patch(`/users/role/${email}`, {
      role: role,
    });
    return result.success;
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
        if (res) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User role changed!",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
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
      </div>
    </div>
  );
};

export default AllUsers;
