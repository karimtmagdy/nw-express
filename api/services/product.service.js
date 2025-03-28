import slugify from "slugify";
import Product from "../models/product.model.js";
import { fn, getPagination } from "../lib/utils.js";
import {
    create_success,
    delete_success,
    failed_create,
    not_available,
    update_success,
  } from "../constants/constants.js";
/**
 * @description create one
 * @methods     POST
 * @routes      /api/v1/products
 * @access      private
 */

// export const createCategory = fn(async (req, res, next) => {
//   const { name    } = req.body;
//   const product = await Product.create({
//     name,
   
//     slug: slugify(name),
//   });
//   if (!product) res.status(400).json({ message: `${failed_create} product` });
//   await product.save();
//   res.status(201).json({
//     status: "success",
//     product,
//     messsage: `product ${create_success}`,
//   });
// });

/**
 * @description get all products
 * @methods     GET
 * @routes      /api/v1/products
 * @access      public
 */

export const getProducts = fn(async (req, res, next) => {
  const total = await Product.countDocuments();
  const { page, limit, skip } = getPagination(total, req.query);
  const pages = Math.ceil(total / limit);
  const products = await Product.find({}).skip(skip).limit(limit).lean();
  if (!products)
    return res.status(404).json({ message: "No products found." });
  const results = total;
  res.status(200).json({ results, pages, page, status: "success", products });
});

/**
 * @description get product by id
 * @methods     GET
 * @routes      /api/v1/products/:id
 * @access      private
 */

// export const singleProduct = fn(async (req, res, next) => {
//   const { id } = req.params;
//   const product = await Product.findById(id);
//   if (!product) res.status(404).json({ message: `product ${not_available}` });
//   res.status(200).json({ status: "success", product });
// });

/**
 * @description update product by id
 * @methods     PATCH
 * @routes      /api/v1/products/:id
 * @access      private
 */

// export const updateProduct = fn(async (req, res, next) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   req.body.slug = slugify(req.body.title);
//   const product = await Product.findOneAndUpdate(
//     { _id: id },
//     { name, slug: slugify(name) },
//     { new: true }
//   );
//   if (!product) res.status(404).json({ message: `product ${not_available}` });
//   res.status(200).json({
//     status: "success",
//     product,
//     messsage: `product ${update_success}`,
//   });
// });

/**
 * @description delete product by id
 * @methods     DELETE
 * @routes      /api/v1/products/:id
 * @access      private
 */

// export const deleteProduct = fn(async (req, res, next) => {
//   const { id } = req.params;
//   const product = await Product.findByIdAndDelete(id);
//   if (!category) res.status(404).json({ message: `product ${not_available}` });
//   res
//     .status(200)
//     .json({ status: "success", product, messsage: `product ${delete_success}` });
// });