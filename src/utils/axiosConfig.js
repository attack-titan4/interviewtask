import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
   
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


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.response && error.response.status === 401) {
   
      console.error('Unauthorized access. Please log in.');
    } else {
      console.error('An error occurred:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
