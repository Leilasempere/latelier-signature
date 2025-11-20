import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, user } = useAuth();

  const redirect = new URLSearchParams(location.search).get("redirect");
  const formationId = new URLSearchParams(location.search).get("formation");

  // Nouveaux champs demandés par ton backend
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const redirectToStripe = async () => {
    try {
      const { data } = await axios.post(
        "https://latelier-signature.onrender.com/api/payments/create-checkout-session",
        {
          formationId,
          userId: user.id,
        }
      );
      window.location.href = data.url;
    } catch (error) {
      console.error("Erreur paiement :", error);
      setError("Impossible de vous rediriger vers le paiement.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const success = await register(
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    );

    if (!success) {
      setError("Impossible de créer le compte. Vérifiez vos informations.");
      return;
    }

    // Ton backend demande une vérification email → pas de login automatique
    alert("Compte créé ! Vérifiez votre boîte mail pour activer votre compte.");

    if (redirect === "buy" && formationId) {
      return redirectToStripe();
    }

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Créer un compte
        </h2>

        {redirect === "buy" && (
          <p className="text-green-600 text-center mb-4 font-medium">
            Créez votre compte pour finaliser votre achat.
          </p>
        )}

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Créer un compte
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Vous avez déjà un compte ?{" "}
          <Link
            to={`/login?redirect=${redirect}&formation=${formationId}`}
            className="text-black font-medium underline hover:text-gray-700"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
