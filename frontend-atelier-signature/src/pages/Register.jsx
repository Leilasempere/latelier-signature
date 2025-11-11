import { useState } from "react";
import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(form);
      setIsError(false);
      setMessage(response.message || "Inscription réussie !");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setIsError(true);
      setMessage(err.message || "Erreur lors de l'inscription. Vérifie tes informations.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>

        {["firstname", "lastname", "email", "password", "confirmPassword"].map(
          (field) => (
            <input
              key={field}
              name={field}
              type={field.includes("password") ? "password" : "text"}
              placeholder={field === "firstname"
                ? "Prénom"
                : field === "lastname"
                ? "Nom"
                : field === "email"
                ? "Adresse email"
                : field === "password"
                ? "Mot de passe"
                : "Confirmer le mot de passe"}
              value={form[field]}
              onChange={handleChange}
              className="border w-full p-2 mb-3 rounded"
              required
            />
          )
        )}

        <button className="bg-black text-white w-full py-2 rounded hover:bg-gray-800">
          S'inscrire
        </button>

        {message && (
          <p
            className={`text-center text-sm mt-3 ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
