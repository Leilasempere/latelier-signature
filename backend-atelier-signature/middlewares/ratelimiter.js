import rateLimit from "express-rate-limit";


export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 20, 
  message: {
    message: "Trop de requêtes effectuées depuis cette adresse IP. Réessayez plus tard.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});


export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    message: "Trop de tentatives de connexion. Réessayez dans 10 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
