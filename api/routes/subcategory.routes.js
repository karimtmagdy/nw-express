import { Router } from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  singleSubCategory,
  updateSubCategory,
} from "../services/subcategory.service.js";

const router = Router();

router.route("/").post(createSubCategory).get(getSubCategories);
router
  .route("/:id")
  .get(singleSubCategory)
  .patch(updateSubCategory)
  .delete(deleteSubCategory);
export { router as subCategoryRoutes };
