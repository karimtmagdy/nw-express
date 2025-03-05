import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  singleCategory,
  updateCategory,
} from "../services/category.service.js";
import {
  validateCreateCategory,
  validateDeleteCategory,
  validateGetSingleCategory,
  validateUpdateCategory,
} from "../validation/category.validate.js";
import { isAdmin } from "../middlewares/JWTauth.js";
const router = Router();
router
  .route("/")
  .post(isAdmin, validate(validateCreateCategory, "body"), createCategory)
  .get(getCategories);
router
  .route("/:id")
  .get(validate(validateGetSingleCategory, "params"), singleCategory)
  .patch(isAdmin, validate(validateUpdateCategory, "body"), updateCategory)
  .delete(isAdmin, validate(validateDeleteCategory, "params"), deleteCategory);

export { router as categoriesRoutes };
