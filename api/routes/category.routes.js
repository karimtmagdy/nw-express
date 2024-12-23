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
  createCategory,
  deleteCategory,
  getCategories,
  singleCategory,
  updateCategory,
} from "../services/category.service.js";

const router = Router();
router.route("/").post(createCategory).get(getCategories);
router
  .route("/:id")
  .get(singleCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

export { router as categoryRoutes };
