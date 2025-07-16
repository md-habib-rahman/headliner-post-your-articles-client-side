import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import useAuth from "./useAuth";

const useSubscriptionStatus = () => {
  const { user, loading } = useAuth();
  const email = user?.email;
  const { data, error, isLoading } = useQuery({
    queryKey: ["subscriptionStatus", email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/subscription/status/${email}`);
      return res.data.valid;
    },
    enabled: !!user && !loading,
  });
  const subscription = data ? data : false;

  return { subscription, error, isLoading };
};

export default useSubscriptionStatus;
