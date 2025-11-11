import Stripe from "stripe";
import dotenv from "dotenv";
import { Commande } from "../models/commandeModel.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Création de la session de paiement Stripe
export const createCheckoutSession = async (req, res) => {
  try {
    const { formation, user_id } = req.body;

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
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        user_id,
        formation_id: formation.id,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Erreur création session Stripe :", error);
    res.status(500).json({ message: "Erreur création session Stripe", error: error.message });
  }
};

// Webhook Stripe : créer la commande après paiement
export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature error :", err.message);
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
      console.log("Commande enregistrée avec succès !");
    } catch (dbError) {
      console.error("Erreur enregistrement commande :", dbError);
    }
  }

  res.status(200).json({ received: true });
};
