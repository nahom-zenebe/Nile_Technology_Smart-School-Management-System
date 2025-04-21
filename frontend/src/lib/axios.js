import axios from 'axios';

const fallbackURL = "https://localhost:5003/api";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL|| fallbackURL}/api`,
    withCredentials: true,
  });
  
export default axiosInstance