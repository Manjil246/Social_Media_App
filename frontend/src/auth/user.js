import axios from "axios";

const axiosUser = axios.create({
  baseURL: "https://social-media-app-backend-three.vercel.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosUser;
