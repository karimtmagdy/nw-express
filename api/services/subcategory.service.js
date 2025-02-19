import { fn } from "../lib/utils.js";
import slugify from "slugify";
import SubCategory from "../models/subcategory.model.js";

/**
 * @description create subcategory
 * @methods     POST
 * @routes      /api/v1/admin/subcategories
 * @access      private
 */
export const createSubCategory = fn(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    category,
    slug: slugify(name),
  });
  res.status(200).json({
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
export const getSubCategories = fn(async (req, res) => {
  const page = parseInt(req.query.page) * 1 || 1;
  const limit = parseInt(req.query.limit) * 1 || 100;
  const skip = (page - 1) * limit;
  const total = await SubCategory.countDocuments();
  const subCategories = await SubCategory.find().skip(skip).limit(limit).lean();
  if (subCategories.length === 0) {
    res.status(404).json({
      status: "fail",
      message: "no available subcategories",
    });
  }
  res
    .status(200)
    .json({ results: total, status: "success", subCategories, messsage: "" });
});
/**
 * @description get subcategory by id
 * @methods     GET
 * @routes      /api/v1/admin/subcategories/:id
 * @access      private
 */
export const singleSubCategory = fn(async (req, res) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    res.status(404).json({
      status: "fail",
      message: "cannot found this subcategories",
    });
  }
  res.status(200).json({ status: "success", subCategory, messsage: "" });
});
/**
 * @description update subcategory by id
 * @methods     PATCH
 * @routes      /api/v1/admin/subcategories/:id
 * @access      private
 */
export const updateSubCategory = fn(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const subCategory = await SubCategory.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!subCategory) {
    res.status(404).json({
      status: "fail",
      message: "cannot found this subcategories",
    });
  }
  res.status(200).json({
    status: "success",
    subCategory,
    messsage: "updated sub category successfully",
  });
});
/**
 * @description delete subcategory by id
 * @methods     DELETE
 * @routes      /api/v1/admin/subcategories/:id
 * @access      private
 */
export const deleteSubCategory = fn(async (req, res) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    res
      .status(404)
      .json({ status: "fail", message: "cannot found this sub category" });
  }
  res
    .status(200)
    .json({ status: "success", messsage: "deleted sub category successfully" });
});
