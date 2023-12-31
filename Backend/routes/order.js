import express from "express";
import {
  createOrder,
  getAdminOrers,
  getMyOrders,
  getOrderDetails,
  processOrder,
  processPayement,
} from "../controllers/orderController.js";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/myorder", getMyOrders);
router.get("/admin", isAdmin, getAdminOrers);
router.route("/:id").get(getOrderDetails).put(isAdmin, processOrder);
router.post("/payment", processPayement);
export default router;
