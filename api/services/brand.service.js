import { fn } from "../lib/utils.js";
import slugify from "slugify";
import Brand from "../models/brand.model.js";

/**
 * @description create brand
 * @method      POST
 * @route       /api/v1/admin/brands
 * @access      private
 */
export const createBrand = fn(async (req, res) => {
  const { name, image } = req.body;
  const brand = await Brand.create({ name, image, slug: slugify(name) });
  await brand.save();
  res.status(201).json({
    status: "success",
    brand,
    messsage: "created brand successfully",
  });
});

export const getBrands = fn(async (req, res) => {
  const page = parseInt(req.query.page) * 1 || 1;
  const limit = parseInt(req.query.limit) * 1 || 10;
  const skip = (page - 1) * limit;
  const total = await Brand.countDocuments();
  const brands = await Brand.find().skip(skip).limit(limit).lean();
  if (brands.length === 0) {
    return res.status(404).json({ message: "No brands avilable" });
  }
  res.status(200).json({ status: "success", results: total, brands });
});

/**
 * @description Get Brand by id
 * @method      GET
 * @route       /api/v1/admin/brands/:id
 * @access      private
 */
export const singleBrand = fn(async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    res
      .status(404)
      .json({ status: "fail", message: "cannot found this brand" });
  }
  res.status(200).json({ status: "success", brand });
});

/**
 * @description update brand by id
 * @method      PATCH
 * @route       /api/v1/admin/brands/:id
 * @access      private
 */
export const updateBrand = fn(async (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;
  const brand = await Brand.findByIdAndUpdate(
    { _id: id },
    {
      name,
      image,
      slug: slugify(name),
    },
    {
      new: true,
    }
  );
  if (!brand) {
    res
      .status(404)
      .json({ status: "fail", message: "cannot found this brand" });
  }
  res.status(200).json({
    status: "sucess",
    message: "updated brand successfully",
    brand,
  });
});

/**
 * @description delete brand by id
 * @method      DELETE
 * @route       /api/v1/admin/brands/:id
 * @access      private
 */
export const deleteBrand = fn(async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    res
      .status(404)
      .json({ status: "fail", message: "cannot found this brand" });
  }
  res.status(204).json({
    status: "sucess",
    message: "deleted brand successfully",
  });
});
