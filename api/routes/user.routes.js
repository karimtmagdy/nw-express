import { Router } from "express";
import { isAdmin } from "../middlewares/JWTauth.js";
import { validate } from "../middlewares/validate.js";
import {
  createUser,
  deleteUser,
  getSingleUserById,
  getUsers,
  updateUser,
} from "../services/user.service.js";
import {
  validateCreateUser,
  validateDeleteUser,
  validateGetSingleUser,
  validateUpdateUser,
} from "../validation/user.validate.js";

const router = Router();
router.use(isAdmin);

router.route("/").get(getUsers).post(validate(validateCreateUser), createUser);
router
  .route("/:id")
  .get(validate(validateGetSingleUser, "params"), getSingleUserById)
  .patch(validate(validateUpdateUser, "body"), updateUser)
  .delete(validate(validateDeleteUser, "params"), deleteUser);

export { router as usersRoutes };
