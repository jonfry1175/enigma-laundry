import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: '/api', // Use the redirect path
})
