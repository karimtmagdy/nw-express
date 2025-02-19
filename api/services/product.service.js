import { fn } from "../lib/utils.js";
import Product from "../models/product.model.js";
import slugify from "slugify";
/**
 * @description create one
 * @methods     POST
 * @routes      /api/v1/products
 * @access      private
 */
export const createProduct = fn(async (req, res) => {
  // const {} = req.body;
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  await product.save();
  res.status(200).json({
    status: "success",
    product,
    messsage: "product created successfully",
  });
});
/**
 * @description get all products
 * @methods     GET
 * @routes      /api/v1/products
 * @access      public
 */
export const getProducts = fn(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const total = await Product.countDocuments();

  const pages = Math.ceil(total / limit);
  const products = await Product.find()
    .skip(skip)
    .limit(limit)
    .populate({
      path: "category",
      select: "name _id",
    })
    .populate({
      path: "brand",
      select: "name _id",
    })
    .populate({
      path: "createdBy",
      select: "username _id",
    })
    .lean();
  res.status(200).json({
    results: total,
    pages,
    status: "success",
    messsage: "all products have been retrieved successfully",
    products,
  });
});
/**
 * @description get product by id
 * @methods     GET
 * @routes      /api/v1/products/:id
 * @access      private
 */
export const singleProduct = fn(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate({
      path: "category",
      select: "name _id",
    })
    .populate({
      path: "brand",
      select: "name _id",
    });
  if (!product) {
    res
      .status(404)
      .json({ status: "fail", message: `cannot found this product ${id}` });
  }
  res.status(200).json({ status: "success", product, messsage: "" });
});
/**
 * @description update product by id
 * @methods     PATCH
 * @routes      /api/v1/products/:id
 * @access      private
 */
export const updateProduct = fn(async (req, res) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title);
  const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    res
      .status(404)
      .json({ status: "fail", message: `cannot found this product ${id}` });
  }
  res.status(200).json({
    status: "success",
    product,
    messsage: "updated product successfully",
  });
});
/**
 * @description delete product by id
 * @methods     DELETE
 * @routes      /api/v1/products/:id
 * @access      private
 */
export const deleteProduct = fn(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete({ _id: id });
  if (!product) {
    res
      .status(404)
      .json({ status: "fail", message: `cannot found this product ${id}` });
  }
  res
    .status(200)
    .json({ status: "success", messsage: "deleted product successfully" });
});
