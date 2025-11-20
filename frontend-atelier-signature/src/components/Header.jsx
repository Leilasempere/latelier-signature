import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-black text-white py-4 px-6 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">
        <Link to="/">L’Atelier Signature</Link>
      </h1>

      <nav className="flex items-center gap-6">
        <Link to="/" className="hover:underline">Formations</Link>

        {!user && (
          <>
            <Link to="/login" className="hover:underline">Connexion</Link>
            <Link to="/register" className="hover:underline">Inscription</Link>
          </>
        )}

        {user && (
          <button
            onClick={logout}
            className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
          >
            Déconnexion
          </button>
        )}
      </nav>
    </header>
  );
}
