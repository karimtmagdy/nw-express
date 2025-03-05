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
  validateUpdateUser,
} from "../validation/user.validate.js";
import { validID } from "../middlewares/validID.js";

const router = Router();
router.use(isAdmin);

router.route("/").get(getUsers).post(validate(validateCreateUser), createUser);
router
  .route("/:id")
  .get(validID, getSingleUserById)
  .patch(validate(validateUpdateUser, "body"), updateUser)
  .delete(validID, deleteUser);

export { router as usersRoutes };
