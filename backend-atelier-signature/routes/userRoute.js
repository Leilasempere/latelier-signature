import express from "express";
import { register, login } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/auth.js";
import pool  from "../config/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();


router.post("/register", register)
router.get("/verify", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send("Lien de validation invalide (aucun token).");
  }

  try {
    // Vérifie le token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // Met à jour la base : validation de l'utilisateur
    const [result] = await pool.query(
      "UPDATE users SET isVerified = 1 WHERE email = ?",
      [email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("Utilisateur introuvable ou déjà vérifié.");
    }

    res.send(`
      <html lang="fr">
        <head>
          <meta charset="UTF-8" />
          <title>Validation réussie</title>
          <style>
            body { font-family: Arial; text-align:center; margin-top:80px; color:#333; }
            h1 { color:#c27ba0; }
          </style>
        </head>
        <body>
          <h1> Adresse e-mail confirmée !</h1>
          <p>Merci ${email}, votre compte est maintenant activé.</p>
          <p>Vous pouvez maintenant vous connecter depuis l’application ou le site </p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Erreur de vérification :", error);
    res.status(400).send("Lien invalide ou expiré. Veuillez vous réinscrire.");
  }
});

//  Route de connexion
router.post("/login", login);

//  Exemple de route protégée
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Profil utilisateur autorisé", user: req.user });
});

export default router;
