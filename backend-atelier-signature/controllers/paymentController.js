import Stripe from "stripe";
import dotenv from "dotenv";
import { Formation } from "../models/formationModel.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { formationId, userId } = req.body;

    if (!formationId || !userId) {
      return res.status(400).json({ 
        message: "formationId et userId sont requis." 
      });
    }

    // 🔍 Récupérer la formation
    const formation = await Formation.findById(formationId);

    if (!formation) {
      return res.status(404).json({ message: "Formation introuvable." });
    }

    // 🧾 Création session Stripe
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
      },
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
