import cors from "cors";

// Configuration CORS centralisée
const corsOptions = {
  origin: [
    "http://localhost:5173",  // ton front local
    "https://lateliersignature.com" // ton vrai domaine en production
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Middleware exporté
export const corsMiddleware = cors(corsOptions);
