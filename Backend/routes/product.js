import express from "express";
import {
  addProductImage,
  createCategory,
  createProduct,
  deleProduct,
  deleteCategory,
  deleteProductImage,
  getAdminProduct,
  getAllCategory,
  getAllProduct,
  getProductDetails,
  updateProduct,
} from "../controllers/productController.js";
import { singleUpload } from "../middlewares/multer.js";
import { isAdmin, requireSignIn } from "./../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/get", getAllProduct);
router
  .route("/:id")
  .get(getProductDetails)
  .put(requireSignIn, isAdmin, updateProduct)
  .delete(requireSignIn, isAdmin, deleProduct);
router.post("/create", requireSignIn, isAdmin, singleUpload, createProduct);
router
  .route("/images/:id")
  .post(requireSignIn, isAdmin, singleUpload, addProductImage)
  .delete(requireSignIn, isAdmin, deleteProductImage);

router.post("/category", requireSignIn, isAdmin, createCategory);
router.get("/get/category", getAllCategory);
router.delete("/category/:id", requireSignIn, isAdmin, deleteCategory);

router.get("/admin/get", requireSignIn, isAdmin, getAdminProduct);

export default router;
