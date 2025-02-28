import { Router } from "express";
import {
  createUser,
  deleteUser,
  getSingleUserById,
  getUsers,
} from "../services/user.service.js";
import { validate, validateData } from "../middlewares/validate.js";
import {
  validateCreateUser,
  validateDeleteUser,
  validateGetSingleUser,
} from "../validation/user.validate.js";
const router = Router();
router
  .route("/")
  .get(getUsers)
  .post(validateData(validateCreateUser), createUser);
router
  .route("/:id")
  .get(validate(validateGetSingleUser, "params"), getSingleUserById)
  .patch()
  .delete(validate(validateDeleteUser, "params"), deleteUser);

export { router as usersRoutes };
