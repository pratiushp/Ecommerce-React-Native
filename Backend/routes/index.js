import express from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import productRoutes from "./product.js";
import { requireSignIn } from "../middlewares/authmiddleware.js";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoutes,
    requireSignIn: false,
  },

  {
    path: "/user",
    route: userRoutes,
    requireSignIn: true,
  },

  {
    path: "/product",
    route: productRoutes,
    requireSignIn: false,
  },
];

defaultRoutes.forEach((route) => {
  if (route.requireSignIn) {
    router.use(route.path, requireSignIn, route.route);
  } else {
    router.use(route.path, route.route);
  }
});

export default router;
