import express from "express";
import {
  getProfile,
  logOut,
  uploadpic,
} from "../controllers/authController.js";
import {
  changePassword,
  updateProfile,
} from "../controllers/userController.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getProfile);
router.get("/logout", logOut);
router.put("/update-profile", updateProfile);
router.put("/change-password", changePassword);

router.put("/update-pic", singleUpload, uploadpic);

export default router;
