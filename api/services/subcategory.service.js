import { fn, getPagination } from "../lib/utils.js";
import slugify from "slugify";
import SubCategory from "../models/subcategory.model.js";
import {
  create_success,
  delete_success,
  not_available,
  update_success,
} from "../constants/constants.js";
// import ApiError from "../lib/api.error.js";

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
    messsage: `sub category ${create_success}`,
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
  if (!subCategories)
    return res.status(404).json({ message: "No subCategories found." });
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
    return res.status(404).json({ message: `subCategory ${not_available}` });
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
    return res.status(404).json({ message: `subCategory ${not_available}` });
  res.status(200).json({
    status: "success",
    subCategory,
    messsage: `sub category ${update_success}`,
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
    return res.status(404).json({ message: `subCategory ${not_available}` });
  res
    .status(200)
    .json({ status: "success", messsage: `sub category ${delete_success}` });
});
