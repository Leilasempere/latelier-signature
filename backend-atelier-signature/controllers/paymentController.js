import Stripe from "stripe";
import dotenv from "dotenv";
import { Commande } from "../models/commandeModel.js";
import { Formation } from "../models/formationModel.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🔥 Création d'une session Stripe
export const createCheckoutSession = async (req, res) => {
  try {
    const { formationId, userId } = req.body;

    if (!formationId || !userId) {
      return res.status(400).json({ message: "formationId et userId sont requis" });
    }

    // Récupération de la formation dans la BDD
    const formation = await Formation.findById(formationId);
    console.log("FORMATION RÉCUPÉRÉE :", formation);

    if (!formation) {
      return res.status(404).json({ message: "Formation introuvable." });
    }

    // ⚠️ UTILISER LES CHAMPS EXACTS DE LA BASE DE DONNÉES
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: formation.title,        // ✔ BON CHAMP
              description: formation.description, // ✔ BON CHAMP
            },
            unit_amount: Math.round(formation.price * 100), // ✔ BON CHAMP
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        user_id: userId,
        formation_id: formationId,
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

// 🔥 Webhook Stripe
export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const signature = req.headers["stripe-signature"];

    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Erreur webhook Stripe :", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      await Commande.create({
        user_id: session.metadata.user_id,
        formation_id: session.metadata.formation_id,
        stripe_payment_id: session.id,
        status: "paid",
      });

      console.log("Commande enregistrée !");
    } catch (error) {
      console.error("Erreur enregistrement commande :", error);
    }
  }

  return res.json({ received: true });
};
