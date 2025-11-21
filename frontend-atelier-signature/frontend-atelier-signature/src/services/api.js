import axios from "axios";

const api = axios.create({
  baseURL: "https://latelier-signature.onrender.com/api", // ton backend Render
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

