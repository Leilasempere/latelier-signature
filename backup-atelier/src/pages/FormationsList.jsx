import { useEffect, useState } from "react";
import { getFormations } from "../services/formation";
import { Link } from "react-router-dom";

export default function FormationsList() {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFormations()
      .then(setFormations)
      .catch((err) => console.error("Erreur chargement formations :", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Chargement des formations...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Nos Formations</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {formations.map((formation) => (
          <div key={formation.id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">{formation.title}</h3>
            <p className="text-gray-600 mb-4">{formation.description}</p>

            <Link
              to={`/formations/${formation.id}`}
              className="bg-black text-white px-4 py-2 rounded-lg block text-center"
            >
              Voir le détail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
