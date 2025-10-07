import rateLimit from "express-rate-limit";

// 🔹 Limiteur global : limite toutes les requêtes API
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // 200 requêtes par IP
  message: {
    message: "Trop de requêtes effectuées depuis cette adresse IP. Réessayez plus tard.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 🔹 Limiteur spécifique pour la route /login
export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // 5 tentatives de connexion
  message: {
    message: "Trop de tentatives de connexion. Réessayez dans 10 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
