// src/pages/Config.js (or wherever it is)
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://appointment-1-pq6g.onrender.com",
    withCredentials: true, // set to true if using cookies
});

export default axiosInstance;
