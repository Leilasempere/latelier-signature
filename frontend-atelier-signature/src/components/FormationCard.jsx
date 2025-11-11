import { Link } from "react-router-dom";

export default function FormationCard({ formation, onBuy }) {
  return (
    <div className="bg-white border rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-2">{formation.title}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-4">
          {formation.description}
        </p>
        <p className="font-bold text-lg">{formation.price} €</p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {/*  Lien vers la page de détails */}
        <Link
          to={`/formation/${formation.id}`}
          className="block text-center bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Voir les détails
        </Link>

        {/*  Bouton d’achat (complètement séparé) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); 
            onBuy(formation);
          }}
          className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Acheter
        </button>
      </div>
    </div>
  );
}
