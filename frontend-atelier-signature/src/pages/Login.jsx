import { useState } from "react";
import { loginUser } from "../services/userService";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser(form);
      login(userData);
      navigate("/");
    } catch {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
          required
        />

        <button className="bg-black text-white w-full py-2 rounded hover:bg-gray-800">
          Se connecter
        </button>

        {error && <p className="text-center text-sm mt-3 text-red-500">{error}</p>}
      </form>
    </div>
  );
}
