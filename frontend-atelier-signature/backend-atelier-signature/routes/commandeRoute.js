import express from "express";
import { createCommande, getCommandes, getCommandeById } from "../controllers/commandeController.js";

const router = express.Router();

router.post("/", createCommande);      // Créer une commande
router.get("/", getCommandes);         // Liste toutes les commandes
router.get("/:id", getCommandeById);   // Détail d’une commande

export default router;
