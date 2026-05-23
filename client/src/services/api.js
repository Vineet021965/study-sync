import axios from "axios";

const API = axios.create({
  baseURL: "https://study-sync-sv0t.onrender.com/api",
});

export default API;