// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// })

import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "/.netlify/functions/api-proxy",
});
