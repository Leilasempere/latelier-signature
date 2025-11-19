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

app.use("/api/payments/webhook", express.raw({ type: "application/json" }));
app.set("trust proxy", 1);

app.use(corsMiddleware);

app.use(express.json());
app.use(helmetMiddleware);

app.use("/api/payments", paymentRoutes);
app.use("/api/users", loginLimiter, userRoutes);

app.use(globalLimiter);

app.use("/api/formations", formationRoutes);
app.use("/api/commandes", commandeRoutes);

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connexion MySQL réussie !");
    connection.release();
  } catch (error) {
    console.error("Erreur de connexion MySQL :", error);
  }
})();

app.get("/", (req, res) => {
  res.send("API L’Atelier Signature fonctionne parfaitement !");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
