import axios from "axios";
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_RES_API || "https://https://api-sigma-azure-86.vercel.app",
});

export default API;
