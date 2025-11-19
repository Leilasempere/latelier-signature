import express from "express";
import { createCheckoutSession, stripeWebhook } from "../controllers/paymentController.js";
import bodyParser from "body-parser";

const router = express.Router();

//  Stripe Webhook DOIT utiliser raw body
router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  stripeWebhook
);

// Session checkout
router.post("/create-checkout-session", createCheckoutSession);

export default router;
