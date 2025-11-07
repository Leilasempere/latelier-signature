export default function FormationCard({ formation, onBuy }) {
  return (
    <div className="border p-5 rounded-2xl shadow-md hover:shadow-lg transition-all bg-white">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {formation.title}
      </h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-3">
        {formation.description}
      </p>
      <p className="text-lg font-bold text-black">{formation.price} €</p>
      <button
        onClick={() => onBuy(formation)}
        className="bg-black text-white w-full mt-4 py-2 rounded-xl hover:bg-gray-800 transition"
      >
        Acheter
      </button>
    </div>
  );
}
