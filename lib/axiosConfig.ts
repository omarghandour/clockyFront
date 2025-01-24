import axios from "axios";
// http://localhost:5000/api
// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // Add this if you need to send credentials with the request
});

// Add an interceptor to attach the token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
