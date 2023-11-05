import express from "express";
import {
  Register,
  forgetPassword,
  loginController,
  resetPassword,
} from "../controllers/authController.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", singleUpload, Register);
router.post("/login", loginController);
router.route("/forget-password").post(forgetPassword).put(resetPassword);

export default router;
