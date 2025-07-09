import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/axiosInstance";
import Loader from "../components/Loader";

const MyProfile = () => {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["my-profile", user.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}`);
      return res.data;
    },
  });
  if (!user) {
    return <Loader />;
  } 
  
  return <div>MyProfile</div>;
};

export default MyProfile;
