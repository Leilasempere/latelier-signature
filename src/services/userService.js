import axios from "axios";

const API_URL = "https://latelier-signature.onrender.com/api/users";

export const registerUser = async (formData) => {
  const response = await axios.post(`${API_URL}/register`, formData);
  return response.data;
};

export const loginUser = async (formData) => {
  const response = await axios.post(`${API_URL}/login`, formData);
  return response.data;
};

