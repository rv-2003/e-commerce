import express from "express";
const router = express.Router();

// controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import checkId from "../middleware/checkId.js";
import upload from "../middleware/uploadMiddleware.js"; // 👈 IMPORT MULTER

// CREATE + LIST
router
  .route("/")
  .get(fetchProducts)
  .post(
    authenticate,
    authorizeAdmin,
    upload.single("image"),   // 👈 MULTER HERE
    addProduct
  );

router.route("/allproducts").get(fetchAllProducts);

router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

// UPDATE + DELETE
router
  .route("/:id")
  .get(fetchProductById)
  .put(
    authenticate,
    authorizeAdmin,
    upload.single("image"),  // 👈 MULTER HERE
    updateProductDetails
  )
  .delete(authenticate, authorizeAdmin, removeProduct);

router.route("/filtered-products").post(filterProducts);

export default router;


