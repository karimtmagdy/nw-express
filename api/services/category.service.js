import slugify from "slugify";
import { cache, fn, generateCacheKey } from "../lib/utils.js";
import Category from "../models/category.model.js";
/**
 * @description create category
 * @method      POST
 * @route       /api/v1/categories
 * @access      private
 * @memberof    Admin
 */
export const createCategory = fn(async (req, res) => {
  const { name, createdBy } = req.body;
  const category = await Category.create({
    name,
    createdBy: createdBy,
    slug: slugify(name),
  });
  if (!category) {
    res.status(400).json({ message: "failed to create category" });
  }

  res.status(201).json({
    status: "success",
    category,
    messsage: "category created successfully",
  });
});
/**
 * @description Get all category
 * @method      GET
 * @route       /api/v1/categories
 * @access      private
 * @memberof    Admin
 */
export const getCategories = fn(async (req, res) => {
  const total = await Category.countDocuments();
  const page = parseInt(req.query.page) * 1 || 1;
  const limit = parseInt(req.query.limit) * 1 || 10;
  const skip = (page - 1) * limit;
  const categories = await Category.find().skip(skip).limit(limit).lean();
  const casheKey = generateCacheKey("Category", { page, limit });
  const cachedData = cache.get(casheKey);
  if (cachedData) {
    return res.json({ cachedData });
  }
  if (categories.length === 0) {
    return res.status(404).json({ message: "No categories found." });
  }
  if (!categories) {
    res.status(500).json({ message: "failed to retrieve categories" });
  }
  res.status(200).json({ results: total, status: "success", categories });
});
/**
 * @description Get category by id
 * @method      GET
 * @route       /api/v1/categories/:id
 * @access      private
 * @memberof    Admin
 */
export const singleCategory = fn(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    res.status(404).json({ status: "fail", message: "category not found" });
  }
  res.status(200).json({ status: "success", category });
});
/**
 * @description update category by id
 * @method      PATCH
 * @route       /api/v1/categories/:id
 * @access      private (only admin)
 * @memberof    Admin
 */
export const updateCategory = fn(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    res.status(404).json({
      status: "fail",
      message: "category not found for update.",
    });
  }
  res.status(200).json({
    status: "success",
    messsage: "category updated successfully.",
    category,
  });
});
/**
 * @description Delete category by id
 * @method      DELETE
 * @route       /api/v1/categories/:id
 * @access      private (only admin)
 * @memberof    Admin
 */
export const deleteCategory = fn(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete({ _id: id });
  if (!category) {
    res.status(404).json({
      status: "fail",
      message: "category not found for delete.",
    });
  }
  res
    .status(200)
    .json({ status: "success", messsage: "category deleted successfully." });
});
