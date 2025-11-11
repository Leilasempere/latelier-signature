import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function FormationDetail() {
  const { id } = useParams();
  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://latelier-signature.onrender.com/api/formations/${id}`)
      .then((res) => setFormation(res.data))
      .catch((err) => console.error("Erreur récupération formation :", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Chargement...</p>;
  if (!formation) return <p className="p-6">Formation introuvable.</p>;

  const handleBuy = async () => {
    try {
      const user_id = 1; // à remplacer par l'ID réel de l'utilisateur connecté
      const { data } = await axios.post(
        "https://latelier-signature.onrender.com/api/payments/create-checkout-session",
        { formation, user_id },
        { headers: { "Content-Type": "application/json" } }
      );
      window.location.href = data.url; // Redirige vers Stripe Checkout
    } catch (error) {
      console.error("Erreur paiement :", error);
      alert("Erreur lors de la création du paiement.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{formation.title}</h1>
      <p className="text-gray-700 mb-6">{formation.description}</p>
      <p className="text-xl font-semibold mb-6">Prix : {formation.price} €</p>

      <button
        onClick={handleBuy}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
      >
        Acheter cette formation
      </button>
    </div>
  );
}
