import axios from "axios";
const API = axios.create({
  baseURL: process.env.BASE_RES_API || "https://api-sigma-azure-86.vercel.app",
});

export default API;
