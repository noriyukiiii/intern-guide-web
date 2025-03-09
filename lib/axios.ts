import axios from "axios";
const API = axios.create({
  baseURL: process.env.BASE_RES_API || "intern-server-noriyukiiii-noriyukiiiis-projects.vercel.app",
});

export default API;
