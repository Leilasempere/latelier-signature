import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";

import userRoutes from "./routes/userRoute.js";
import formationRoutes from "./routes/formationRoute.js";
import commandeRoutes from "./routes/commandeRoute.js";
import paymentRoutes from "./routes/paymentRoute.js";

import { corsMiddleware } from "./middlewares/cors.js";
import { helmetMiddleware } from "./middlewares/helmet.js";
import { globalLimiter, loginLimiter } from "./middlewares/ratelimiter.js";

dotenv.config();

const app = express();

/**
 * 1️⃣ Stripe Webhook → DOIT être AVANT express.json()
 * Et Stripe exige le raw body pour vérifier la signature
 */
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

/**
 * 2️⃣ Render envoie un header X-Forwarded-For
 * Le rate limiter NE FONCTIONNE PAS sans trust proxy
 */
app.set("trust proxy", 1);

/**
 * 3️⃣ CORS (doit être avant toutes les routes API)
 */
app.use(corsMiddleware);

/**
 * 4️⃣ Parser JSON (après le webhook Stripe)
 */
app.use(express.json());

/**
 * 5️⃣ Sécurité Helmet
 */
app.use(helmetMiddleware);

/**
 * 6️⃣ Routes sans limitations (paiement)
 */
app.use("/api/payments", paymentRoutes);

/**
 * 7️⃣ Route Users avec loginLimiter
 */
app.use("/api/users", loginLimiter, userRoutes);

/**
 * 8️⃣ Rate limiter global pour les autres routes
 */
app.use(globalLimiter);

/**
 * 9️⃣ Autres routes API
 */
app.use("/api/formations", formationRoutes);
app.use("/api/commandes", commandeRoutes);

/**
 * 🔟 Vérification Base de Données
 */
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connexion MySQL réussie !");
    connection.release();
  } catch (error) {
    console.error("Erreur de connexion MySQL :", error);
  }
})();

/**
 * 1️⃣1️⃣ Route test
 */
app.get("/", (req, res) => {
  res.send("API L’Atelier Signature fonctionne parfaitement !");
});

/**
 * 1️⃣2️⃣ Lancement du serveur
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
