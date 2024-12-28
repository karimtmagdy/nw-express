import { Router } from "express";
// import {
//   createCategorySchema,
//   getCategoriesSchema,
//   singleCategorySchema,
//   updateCategorySchema,
//   deleteCategorySchema,
// } from "../validation/category.validate.js";
// import { validateData } from "../validation/validate.js";
import {
  createProduct,
  getProducts,
  deleteProduct,
  singleCategory,
  updateProduct,
} from "../services/product.service.js";

const router = Router();
router.route("/").post(createProduct).get(getProducts);
// .get(validateData(getCategoriesSchema), getCategories);
router
  .route("/:id")
  .get(singleCategory)
  .patch(updateProduct)
  .delete(deleteProduct);

export { router as productRoutes };
