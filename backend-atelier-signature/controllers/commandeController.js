import { Commande } from "../models/commandeModel.js";

// Créer une commande manuelle (utile pour test sans Stripe)
export const createCommande = async (req, res) => {
  try {
    const { user_id, formation_id, stripe_payment_id } = req.body;

    const commande = await Commande.create({
      user_id,
      formation_id,
      stripe_payment_id,
      status: "paid",
    });

    res.status(201).json({
      message: "Commande créée avec succès.",
      commande,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de la commande.",
      error: error.message,
    });
  }
};

// Récupérer toutes les commandes
export const getCommandes = async (req, res) => {
  try {
    const commandes = await Commande.findAll();
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Récupérer une commande spécifique
export const getCommandeById = async (req, res) => {
  try {
    const { id } = req.params;
    const commande = await Commande.findById(id);
    if (!commande) return res.status(404).json({ message: "Commande introuvable" });
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
