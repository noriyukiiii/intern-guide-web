import axios from "axios";
const API = axios.create({
  baseURL: process.env.BASE_RES_API, // ตั้งค่าฐาน API
});

export default API;
