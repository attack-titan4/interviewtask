import axios from 'axios';

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/', // Base URL for API requests
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token or handle requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Add JWT token from localStorage if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses or errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally, e.g., display error messages
    if (error.response && error.response.status === 401) {
      // Unauthorized, redirect to login or show error
      console.error('Unauthorized access. Please log in.');
    } else {
      console.error('An error occurred:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
