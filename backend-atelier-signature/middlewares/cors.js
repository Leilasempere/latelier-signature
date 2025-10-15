import cors from "cors";

// Configuration CORS 
const corsOptions = {
  origin: [
    "http://localhost:5173", 
    "https://lateliersignature.com" // nom de domaine en production
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);
