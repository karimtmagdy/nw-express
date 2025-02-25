import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  singleCategory,
  updateCategory,
} from "../services/category.service.js";
import { validate } from "../middlewares/validate.js";
import {
  validateCreateCategory,
  validateGetSingleCategory,
} from "../validation/category.validate.js";

const router = Router();

router
  .route("/")
  .get(getCategories)
  .post(validate(validateCreateCategory), createCategory); //.post(privateRoute, createCategory);
router
  .route("/:id")
  .get(singleCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

export { router as categoryRoutes };
