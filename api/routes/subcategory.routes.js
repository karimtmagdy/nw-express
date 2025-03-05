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
import {
  validateDeleteSubCategory,
  validateGetSingleSubCategory,
} from "../validation/subcategory.validate.js";
import { validID } from "../middlewares/validID.js";
const router = Router();
router.route("/").post(isAdmin, createSubCategory).get(getSubCategories);
router
  .route("/:id")
  .get(validID, singleSubCategory)
  .patch(isAdmin, updateSubCategory)
  .delete(isAdmin, validID, deleteSubCategory);
export { router as subcategoriesRoutes };
