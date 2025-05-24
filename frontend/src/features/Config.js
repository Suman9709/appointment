
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://appointment-1-pq6g.onrender.com",
    withCredentials: true, 
});

export default axiosInstance;
