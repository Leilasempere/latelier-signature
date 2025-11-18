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

// 1. CORS + JSON
app.use(corsMiddleware);
app.use(express.json());

// 2. Helmet (avant toutes les routes)
app.use(helmetMiddleware);

// 3. Route paiement (jamais limitée)
app.use("/api/payments", paymentRoutes);

// 4. Route users avec loginLimiter
app.use("/api/users", loginLimiter, userRoutes);

// 5. Global limiter appliqué APRÈS les routes critiques
app.use(globalLimiter);

// 6. Le reste des routes API
app.use("/api/formations", formationRoutes);
app.use("/api/commandes", commandeRoutes);

// Vérification DB
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connexion MySQL réussie !");
    connection.release();
  } catch (error) {
    console.error("Erreur de connexion MySQL :", error);
  }
})();

// Route test
app.get("/", (req, res) => {
  res.send("API L’Atelier Signature fonctionne parfaitement !");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
