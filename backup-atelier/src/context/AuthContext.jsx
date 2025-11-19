import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Charger depuis localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    const res = await fetch(import.meta.env.VITE_API_URL + "/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) return false;

    const data = await res.json();

    const cleanedUser = {
      id: data.user.id,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email,
      role: data.user.role
    };

    setUser(cleanedUser);
    localStorage.setItem("user", JSON.stringify(cleanedUser));
    localStorage.setItem("token", data.token);

    return true;
  };

  const register = async (firstName, lastName, email, password, confirmPassword) => {
    const res = await fetch(import.meta.env.VITE_API_URL + "/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      })
    });

    if (!res.ok) return false;

    return true; // Email de vérification envoyé
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
