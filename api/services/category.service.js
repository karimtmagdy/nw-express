import slugify from "slugify";
import Category from "../models/category.model.js";
import { fn, getPagination } from "../lib/utils.js";
import ApiError from "../lib/api.error.js";
// import { cache, generateCacheKey } from "../lib/utils.js";

/**
 * @description create category
 * @method      POST
 * @route       /api/v1/categories
 * @access      private
 */
export const createCategory = fn(async (req, res, next) => {
  const { name, createdBy } = req.body;
  const category = await Category.create({
    name,
    createdBy: createdBy,
    slug: slugify(name),
  });
  if (!category)
    return res.status(400).json({ message: "failed to create category" });
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
 */
export const getCategories = fn(async (req, res, next) => {
  const total = await Category.countDocuments();
  const { page, limit, skip } = getPagination(total, req.query);
  const pages = Math.ceil(total / limit);
  const categories = await Category.find({}).skip(skip).limit(limit).lean();
  if (!categories)
    return res.status(404).json({ message: "No categories found." });
  const results = total;
  res.status(200).json({ results, pages, page, status: "success", categories });
});

/**
 * @description Get category by id
 * @method      GET
 * @route       /api/v1/categories/:id
 * @access      private
 */

export const singleCategory = fn(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) return next(new ApiError("category not found", 404));
  res.status(200).json({ status: "success", category });
});

/**
 * @description update category by id
 * @method      PATCH
 * @route       /api/v1/categories/:id
 * @access      private (only admin)
 */

export const updateCategory = fn(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) return next(new ApiError("cannot found this category", 404));
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
 */

export const deleteCategory = fn(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) return next(new ApiError("cannot found this category", 404));
  res
    .status(200)
    .json({ status: "success", messsage: "deleted category successfully" });
});
