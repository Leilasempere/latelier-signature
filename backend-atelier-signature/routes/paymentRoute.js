import express from "express";
import { createCheckoutSession} from "../controllers/paymentController.js";
import bodyParser from "body-parser";

const router = express.Router();



// Session checkout
router.post("/create-checkout-session", createCheckoutSession);

export default router;
