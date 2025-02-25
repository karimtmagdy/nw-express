import { fn, getPagination } from "../lib/utils.js";
import slugify from "slugify";
import SubCategory from "../models/subcategory.model.js";
import ApiError from "../lib/api.error.js";

/**
 * @description create subcategory
 * @methods     POST
 * @routes      /api/v1/subcategories
 * @access      private
 */
export const createSubCategory = fn(async (req, res) => {
  const { name, category, createdBy } = req.body;
  const subCategory = await SubCategory.create({
    name,
    category,
    createdBy,
    slug: slugify(name),
  });
  res.status(201).json({
    status: "success",
    subCategory,
    messsage: "sub category created successfully",
  });
});
/**
 * @description get all subcategories
 * @methods     GET
 * @routes      /api/v1/subcategories
 * @access      public
 */
export const getSubCategories = fn(async (req, res, next) => {
  const total = await SubCategory.countDocuments();
  const { page, limit, skip } = getPagination(total, req.query);
  const pages = Math.ceil(total / limit);
  const subCategories = await SubCategory.find({})
    .populate({
      path: "category",
      select: "name",
    })
    .populate({
      path: "createdBy",
      select: "username",
    })
    .skip(skip)
    .limit(limit)
    .lean();
  if (subCategories.length === 0)
    return next(new ApiError("no available subcategories", 404));
  const results = total;
  res
    .status(200)
    .json({ results, pages, page, status: "success", subCategories });
});
/**
 * @description get subcategory by id
 * @methods     GET
 * @routes      /api/v1/subcategories/:id
 * @access      private
 */
export const singleSubCategory = fn(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  if (!subCategory)
    return next(new ApiError("cannot found this subcategories", 404));
  res.status(200).json({ status: "success", subCategory });
});
/**
 * @description update subcategory by id
 * @methods     PATCH
 * @routes      /api/v1/subcategories/:id
 * @access      private
 */
export const updateSubCategory = fn(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await SubCategory.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subCategory)
    return next(new ApiError("cannot found this subcategories", 404));
  res.status(200).json({
    status: "success",
    subCategory,
    messsage: "updated sub category successfully",
  });
});
/**
 * @description delete subcategory by id
 * @methods     DELETE
 * @routes      /api/v1/subcategories/:id
 * @access      private
 */
export const deleteSubCategory = fn(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory)
    return next(new ApiError("cannot found this subcategories", 404));
  res
    .status(200)
    .json({ status: "success", messsage: "deleted sub category successfully" });
});
