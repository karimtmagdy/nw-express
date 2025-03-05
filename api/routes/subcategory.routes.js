import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { isAdmin } from "../middlewares/JWTauth.js";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  singleSubCategory,
  updateSubCategory,
} from "../services/subcategory.service.js";
const router = Router();
router.route("/").post(isAdmin, createSubCategory).get(getSubCategories);
router
  .route("/:id")
  .get(singleSubCategory)
  .patch(isAdmin, validate("body"), updateSubCategory)
  .delete(isAdmin, validate("params"), deleteSubCategory);
export { router as subcategoriesRoutes };
