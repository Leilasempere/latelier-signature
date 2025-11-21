import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BuyButton from "../components/BuyButton"; 
// Assure-toi que le chemin est correct

export default function FormationDetail() {
  const { id } = useParams();

  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger la formation (page publique)
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/formations/${id}`)
      .then((res) => setFormation(res.data))
      .catch(() => console.error("Erreur récupération formation"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!formation) return <p>Formation introuvable.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{formation.title}</h1>

      <p className="text-gray-700 mb-6">{formation.description}</p>

      <p className="text-xl font-semibold mb-6">
        Prix : {formation.price} €
      </p>

      <div
  className="mt-6 leading-relaxed text-gray-700 whitespace-pre-line"
  dangerouslySetInnerHTML={{ __html: formation.detailed_formation }}
     ></div>

      <BuyButton formation={formation} />
    </div>
  );
}
