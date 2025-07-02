import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000" || "https://e-commerce-backend-8ywm.onrender.com" ,
  withCredentials: true, 
});

export default axiosInstance;
