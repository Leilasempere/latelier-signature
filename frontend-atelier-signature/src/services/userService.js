// src/services/userService.js
import axios from "axios";

const API_URL = "https://latelier-signature.onrender.com/api/users"; 
// ou "http://localhost:5000/api/users" si tu es en local

// 👉 Fonction pour l’inscription
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Erreur inscription :", error);
    throw error.response?.data || { message: "Erreur serveur" };
  }
};

// 👉 Fonction pour la connexion
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Erreur connexion :", error);
    throw error.response?.data || { message: "Erreur serveur" };
  }
};
