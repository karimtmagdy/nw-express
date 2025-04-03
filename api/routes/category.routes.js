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
  validateUpdateCategory,
} from "../validation/category.validate.js";
import { isAdmin } from "../middlewares/JWTauth.js";
import { validID } from "../middlewares/validID.js";
const router = Router();
router
  .route("/")
  .post(isAdmin,  createCategory)
  .get(getCategories);
router
  .route("/:id")
  .get(validID, singleCategory)
  .patch(isAdmin, validate(validateUpdateCategory, "body"), updateCategory)
  .delete(isAdmin, validID, deleteCategory);

export { router as categoriesRoutes };
