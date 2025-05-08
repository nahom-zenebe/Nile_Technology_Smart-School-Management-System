import axios from 'axios';

const fallbackURL = "http://localhost:5003/api";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || fallbackURL,
  withCredentials: true,
});

export default axiosInstance;