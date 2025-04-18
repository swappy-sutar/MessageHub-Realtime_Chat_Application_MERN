import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },


})

export { axiosInstance };