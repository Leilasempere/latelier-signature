import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//authentification JWT
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token manquant." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Format du token invalide." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error("Erreur de vérification du token :", error);
    return res.status(403).json({ message: "Token invalide ou expiré." });
  }
};
