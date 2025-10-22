import express from "express";
import dotenv from "dotenv";
import pool  from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { globalLimiter, loginLimiter } from "./middlewares/ratelimiter.js";
import { helmetMiddleware } from "./middlewares/helmet.js";
import formationRoutes from "./routes/formationRoute.js";
import commandeRoutes from "./routes/commandeRoute.js";
dotenv.config();

const app = express();

//Middlewares globaux
app.use(corsMiddleware);
app.use(express.json());
app.use(globalLimiter);
app.use(helmetMiddleware);

//Test connexion MySQL
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log(" Connexion MySQL réussie !");
    connection.release();
  } catch (error) {
    console.error(" Erreur de connexion MySQL :", error);
  }
})();

//Routes principales
app.use("/api/users",loginLimiter, userRoutes);
app.use("/api/formations", formationRoutes);
app.use("/api/commandes", commandeRoutes);

app.get("/", (req, res) => {
  res.send(" API L’Atelier Signature fonctionne");
});


//Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

