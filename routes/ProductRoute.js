import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductsController.js";
import { verifyUser, adminOnly } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/products", verifyUser, getProducts);
router.get("/product/:id", verifyUser, getProductById);
router.post("/product", verifyUser, createProduct);
router.patch("/product/:id", verifyUser, updateProduct);
router.delete("product/:id", verifyUser, deleteProduct);

export default router;
