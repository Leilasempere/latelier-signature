// controllers/paymentController.js
import Stripe from "stripe";
import dotenv from "dotenv";
import { Formation } from "../models/formationModel.js";
import path from "path";
import { fileURLToPath } from "url";
import { sendMail } from "../utils/mailer.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ----------------------
// 1️⃣ Création session Stripe
// ----------------------
export const createCheckoutSession = async (req, res) => {
  try {
    const { formationId, userId } = req.body;

    if (!formationId || !userId) {
      return res.status(400).json({ 
        message: "formationId et userId sont requis." 
      });
    }

    const formation = await Formation.findById(formationId);
    if (!formation) {
      return res.status(404).json({ message: "Formation introuvable." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: formation.title,
              description: formation.description,
            },
            unit_amount: Math.round(formation.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        userId,
        formationId,
      }
    });

    return res.json({ url: session.url });

  } catch (error) {
    console.error("Erreur création session Stripe :", error);
    return res.status(500).json({
      message: "Erreur création session Stripe",
      error: error.message,
    });
  }
};


// ----------------------
// 2️⃣ Mappage formations → PDFs
// ----------------------
const PDF_MAP = {
  1: "pdfBodysculptDuo.pdf",
  2: "pdfDermaSkinGlow.pdf",
  3: "pdfVacuoLift.pdf",
};


// ----------------------
// 3️⃣ Après paiement : envoi email + PDF
// ----------------------
export const paymentSuccess = async (req, res) => {
  try {
    const { email, formationId } = req.body;

    if (!email || !formationId) {
      return res.status(400).json({ error: "Email ou formationId manquant" });
    }

    const pdfFile = PDF_MAP[formationId];
    if (!pdfFile) {
      return res.status(400).json({ error: "PDF introuvable pour cette formation" });
    }

    // Chemin du PDF
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "..", "utils", "pdfs", pdfFile);

    // 📧 Envoi email via Brevo
    await sendMail({
      to: email,
      subject: "Votre formation - Atelier Signature",
      html: `
        <h2>Merci pour votre achat 💖</h2>
        <p>Vous trouverez votre formation en pièce jointe.</p>
      `,
      attachments: [
        {
          filename: pdfFile,
          path: filePath,
        },
      ],
    });

    return res.json({ success: true, message: "Email envoyé avec succès" });

  } catch (err) {
    console.error("Erreur email paiement:", err);
    return res.status(500).json({ error: "Erreur envoi email" });
  }
};
