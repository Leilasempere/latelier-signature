import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { sendVerificationEmail } from "../utils/mailer.js";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Enregistrement d’un utilisateur
export const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, role } = req.body;

  try {
    // Vérif mots de passe
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }

    // Vérif si email déjà utilisé
    const existing = await User.findByEmail(email);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Email déjà utilisé." });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const userId = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "client",
    });

    // Envoi du mail de vérification (optionnel)
    try {
      await sendVerificationEmail(email, firstName);
    } catch (mailError) {
      console.error("Erreur d’envoi du mail :", mailError);
    }

    res.status(201).json({ message: "Utilisateur créé avec succès.", userId });
  } catch (error) {
    console.error("Erreur serveur (register):", error);
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};

// 🔹 Connexion d’un utilisateur
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findByEmail(email);

    if (existing.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const user = existing[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Connexion réussie.",
      token,
      user: { id: user.id, firstName: user.firstName, lastName: user.lastName, role: user.role },
    });
  } catch (error) {
    console.error("Erreur serveur (login):", error);
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};
