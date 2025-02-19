import slugify from "slugify";
import Category from "../models/category.model.js";
import { fn } from "../lib/utils.js";
// import { cache, generateCacheKey } from "../lib/utils.js";

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
  await category.save();
  res.status(201).json({
    status: "success",
    category,
    messsage: "category created successfully",
  });
});

/**
 * @description all category
 * @method      GET
 * @route       /api/v1/categories
 * @access      public
 * @memberof    Admin & User
 */
export const getCategories = fn(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const total = await Category.countDocuments();
  const pages = Math.ceil(total / limit);
  // const casheKey = generateCacheKey("Category", { page, limit });
  // const cachedData = cache.get(casheKey);
  // if (cachedData)  return res.json({ cachedData });

  const categories = await Category.find().skip(skip).limit(limit).lean();
  if (!categories) {
    res.status(500).json({ message: "failed to retrieve categories" });
  }
  if (categories.length === 0) {
    return res.status(404).json({ message: "No categories found." });
  }
  res
    .status(200)
    .json({
      results: total,
      pages,
      status: "success",
      message: "all categories have been retrieved successfully",
      categories,
    });
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
  const category = await Category.findById({ _id: id });
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
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    res
      .status(404)
      .json({ status: "fail", message: "cannot found this category" });
  }
  res.status(200).json({
    status: "success",
    category,
    messsage: "updated category successfully",
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
    res
      .status(404)
      .json({ status: "fail", message: "cannot found this category" });
  }
  res.status(200).json({
    status: "success",
    messsage: "deleted category successfully",
  });
});
