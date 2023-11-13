import express from "express";
import { createOrder, getMyOrders } from "../controllers/orderController.js";
import { requireSignIn } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/", getMyOrders);

export default router;
