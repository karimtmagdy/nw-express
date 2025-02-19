import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  singleCategory,
  updateCategory,
} from "../services/category.service.js";
import { privateRoute } from "../middlewares/verifyToken.js";
const router = Router();
router.route("/").get(getCategories).post(privateRoute, createCategory);
router
  .route("/:id")
  .get(privateRoute, singleCategory)
  .patch(privateRoute, updateCategory)
  .delete(privateRoute, deleteCategory);
export { router as categoryRoutes };
