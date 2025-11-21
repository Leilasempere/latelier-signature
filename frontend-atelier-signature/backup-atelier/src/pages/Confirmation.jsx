import api from "./api";

// Enregistrement
export const registerUser = async (userData) => {
  const { data } = await api.post("/users/register", userData);
  return data;
};

// Connexion
export const loginUser = async (credentials) => {
  const { data } = await api.post("/users/login", credentials);
  return data;
};
