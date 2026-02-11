import Category from "../models/categoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// CREATE CATEGORY
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const existingCategory = await Category.findOne({ name });

  if (existingCategory) {
    return res.status(400).json({ message: "Category already exists" });
  }

  const category = await Category.create({ name });

  res.status(201).json(category);
});

// UPDATE CATEGORY
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  category.name = name || category.name;

  const updatedCategory = await category.save();

  res.json(updatedCategory);
});


// DELETE CATEGORY
const removeCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  await category.deleteOne();

  res.json({ message: "Category removed successfully" });
});

// LIST ALL CATEGORIES
const listCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// READ SINGLE CATEGORY
const readCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
});

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};
