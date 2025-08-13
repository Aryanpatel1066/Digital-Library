import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1066/library/api/v1/", // your backend base URL
});

export default api;
