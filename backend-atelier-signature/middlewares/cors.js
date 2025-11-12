import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://latelier-signature.onrender.com",
  "https://lateliersignature.com"
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Autorise les requêtes sans origin (ex : Stripe Webhooks, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(" Origin non autorisée :", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
