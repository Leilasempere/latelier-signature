import express from "express";
import { createCheckoutSession, stripeWebhook } from "../controllers/paymentController.js";
import bodyParser from "body-parser";

const router = express.Router();

// Route pour créer une session Stripe
router.post("/create-checkout-session", createCheckoutSession);

// Webhook Stripe (doit recevoir le raw body)
router.post("/webhook", bodyParser.raw({ type: "application/json" }), stripeWebhook);

export default router;
