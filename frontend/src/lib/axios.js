import axios from 'axios';

const fallbackURL = "https://localhost:5003";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || fallbackURL,
  withCredentials: true,
});

export default axiosInstance;