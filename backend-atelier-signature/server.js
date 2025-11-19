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

app.set("trust proxy", 1);


// CORS
app.use(corsMiddleware);

// Routes Paiements
app.use("/api/payments", paymentRoutes);



// Body parser JSON (après le webhook Stripe)
app.use(express.json());

// Sécurité
app.use(helmetMiddleware);

// Routes Users (avec limite login)
app.use("/api/users", loginLimiter, userRoutes);

// Rate limiter global
app.use(globalLimiter);

// Autres routes API
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
