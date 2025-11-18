import { Link } from "react-router-dom";

export default function FormationCard({ formation }) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">{formation.title}</h3>

      <p className="text-gray-600 mb-4 line-clamp-3">
        {formation.description}
      </p>

      {/* 👉 Bouton Voir les détails uniquement */}
      <Link
        to={`/formation/${formation.id}`}
        className="block text-center bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        Voir les détails
      </Link>
    </div>
  );
}
