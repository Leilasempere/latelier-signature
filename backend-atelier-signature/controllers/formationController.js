import { Formation } from "../models/formationModel.js";

// Récupérer toutes les formations
export const getAllFormations = async (req, res) => {
  try {
    const formations = await Formation.findAll();
    res.status(200).json(formations);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des formations.",
      error: error.message,
    });
  }
};

// Récupérer une seule formation
export const getFormationById = async (req, res) => {
  try {
    const { id } = req.params;
    const formation = await Formation.findById(id);

    if (!formation)
      return res.status(404).json({ message: "Formation non trouvée." });

    res.status(200).json(formation);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération de la formation.",
      error: error.message,
    });
  }
};


// Créer une nouvelle formation
export const createFormation = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    if (!title || !description || !price || !category) {
      return res
        .status(400)
        .json({ message: "Le titre, la description, le prix et la catégorie sont requis." });
    }

    const formation = await Formation.create({
      title,
      description,
      price,
      category
    });

    res.status(201).json(formation);
  } catch (error) {
    console.error("Erreur création formation :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la création de la formation.",
      error: error.message,
    });
  }
};

// Supprimer une formation
export const deleteFormation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID de la formation requis." });
    }

    const deleted = await Formation.remove(id);

    if (!deleted) {
      return res.status(404).json({ message: "Formation non trouvée." });
    }

    res.status(200).json({ message: "Formation supprimée avec succès." });
  } catch (error) {
    console.error("Erreur suppression formation :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la suppression.",
      error: error.message,
    });
  }
};








