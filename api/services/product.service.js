import Product from "../models/product.model.js";
import { fn } from "../lib/utils.js";
import slugify from "slugify";
/**
 * @description create product
 * @method      POST
 * @route       /api/v1/products
 * @access      private
 * @memberof    Admin
 */
export const createProduct = fn(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  // req.body.about.model  = slugify(req.body.about.model);

  const product = (await Product.create(req.body)) 
  await product.save();
  res.status(201).json({
    status: "success",
    product,
    messsage: "created product successfully",
  });
});
/**
 * @description Get all product
 * @method      GET
 * @route       /api/v1/products
 * @access      private
 * @memberof    Admin
 */
export const getProducts = fn(async (req, res) => {
  const total = await Product.countDocuments();
  const page = parseInt(req.query.page) * 1 || 1;
  const limit = parseInt(req.query.limit) * 1 || 10;
  const skip = (page - 1) * limit;
  const products = await Product.find({})
    .skip(skip)
    .limit(limit)
    .populate({
      path: "category",
      select: "name _id",
    })
    .populate({
      path: "createdBy",
      select: "username _id",
    })
    .populate({
      path: "brand",
      select: "name _id",
    })
    .lean();
  res.status(200).json({ results: total, status: "success", products });
});
// const allProduct = asyncHandler(async (req, res) => {
//   const page = parseInt(req.query.page) * 1 || 1;
//   const limit = parseInt(req.query.limit) * 1 || 10;
//   const skip = (page - 1) * limit;
//   const products = await Product.find({})
//     .skip(skip)
//     .limit(limit)
//     .populate({
//       path: "category",
//       select: "name _id",
//     })
//     .populate({
//       path: "brand",
//       select: "name _id",
//     });
//   res
//     .status(200)
//     .json({ results: products.length, status: "success", products });
// });
/**
 * @description Get product by id
 * @method      GET
 * @route       /api/v1/products:id
 * @access      private
 * @memberof    Admin
 */
export const singleCategory = fn(async (req, res) => {
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
    res.status(404).json({ status: "fail", message: "product not found" });
  }
  res
    .status(200)
    .json({ status: "success", product, message: "get product successfully" });
});

/**
 * @description Update product by id
 * @method      PUT
 * @route       /api/products:id
 * @access      private
 * @memberof    Admin
 */

//   req.body.slug = slugify(req.body.title);
//   req.body.slug_model = slugify(req.body.model);
export const updateProduct = fn(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const product = await Product.findByIdAndUpdate(
    { _id: id },
    req.body,
    { slug: slugify(req.body.title) },
    { new: true }
  );
  if (!product) {
    res.status(404).json({
      status: "fail",
      message: "product not found for update.",
    });
  }
  res.status(200).json({
    status: "success",
    messsage: "product updated successfully.",
    product,
  });
});
/**
 * @description Delete product by id
 * @method      DELETE
 * @route       /api/v1/products:id
 * @access      private
 * @memberof    Admin
 */
export const deleteProduct = fn(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete({ _id: id });
  if (!product) {
    res.status(404).json({
      status: "fail",
      message: "product not found for delete.",
    });
  }
  res.status(200).json({
    status: "success",
    product,
    messsage: "product deleted successfully.",
  });
});
