import React from "react";
import useAuth from "./useAuth";

import axiosInstance from "../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
  const { user, loading } = useAuth();

  const { data, error, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const response = await axiosInstance.get(`/user/role/${user.email}`);
	  
      return response.data.role;
    },
    enabled: !!user && !loading,
  });
// console.log(data)
  const role = data;
  
  return { role, error, isLoading };
};

export default useUserRole;
