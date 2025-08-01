import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api/v1"
      : "/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance };