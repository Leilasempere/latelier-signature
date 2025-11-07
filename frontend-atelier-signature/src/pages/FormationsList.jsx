import { useEffect, useState } from "react";
import { getFormations } from "../services/formation";
import FormationCard from "../components/FormationCard";

export default function FormationsList() {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFormations()
      .then(setFormations)
      .catch((err) => console.error("Erreur chargement formations :", err))
      .finally(() => setLoading(false));
  }, []);

  const handleBuy = (formation) => {
    alert(` Vous allez acheter la formation : ${formation.title}`);
    // ici, plus tard, tu intégreras Stripe
  };

  if (loading) return <p className="text-center mt-10">Chargement des formations...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
         Nos Formations Haut de Gamme
      </h1>

      {formations.length === 0 ? (
        <p className="text-center text-gray-500">Aucune formation disponible.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formations.map((formation) => (
            <FormationCard
              key={formation.id}
              formation={formation}
              onBuy={handleBuy}
            />
          ))}
        </div>
      )}
    </div>
  );
}
