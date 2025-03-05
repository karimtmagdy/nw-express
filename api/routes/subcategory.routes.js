import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { isAdmin } from "../middlewares/JWTauth.js";
const router = Router();
router.route("/").post(isAdmin, validate("body")).get();
router
  .route("/:id")
  .get()
  .patch(isAdmin, validate("body"))
  .delete(isAdmin, validate("params"));
export { router as subcategoriesRoutes };
