import express from "express";
const router = express.Router();

import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

// CREATE + LIST
router
  .route("/")
  .post(authenticate, authorizeAdmin, createCategory)
  .get(listCategory);

// READ SINGLE
router.route("/:id").get(readCategory);

// UPDATE + DELETE
router
  .route("/:id")
  .put(authenticate, authorizeAdmin, updateCategory)
  .delete(authenticate, authorizeAdmin, removeCategory);

export default router;
