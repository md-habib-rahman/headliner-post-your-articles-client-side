import axios from "axios";

const useAxiosInstanceSecure = () => {
  const axiosInstanceSecure = axios.create({
    baseURL: "https://headliner-server.vercel.app/", //vercel prod url
    // baseURL: "http://localhost:5000",
  });
  axiosInstanceSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return axiosInstanceSecure;
};

export default useAxiosInstanceSecure;
