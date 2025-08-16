import axios from "axios";

const axiosInstance = axios.create({
  //   baseURL: "https://headliner-server.vercel.app/", //vercel prod url
  baseURL: "http://localhost:5000",
  //withCredentials: true,
});

const useAxiosInstance = () => {
  return axiosInstance;
};

export default axiosInstance;
