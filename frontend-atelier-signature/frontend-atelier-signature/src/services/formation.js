const API_URL = import.meta.env.VITE_API_URL;

export async function getFormations() {
  const res = await fetch(`${API_URL}/api/formations`);
  if (!res.ok) throw new Error("Erreur lors du chargement des formations");
  return res.json();
}

export async function getFormationById(id) {
  const res = await fetch(`${API_URL}/api/formations/${id}`);
  if (!res.ok) throw new Error("Formation introuvable");
  return res.json();
}
