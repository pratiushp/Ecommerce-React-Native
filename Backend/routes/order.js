import express from "express";
import { createOrder } from "../controllers/orderController.js";
import { requireSignIn } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/create", requireSignIn, createOrder);

export default router;
