import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  singleUser,
  updateUser,
} from "../services/user.service.js";
// import { validateData } from "../validation/validate.js";
import { validateUser } from "../validation/user.validate.js";
const router = Router();

router.route("/").get(getUsers).post(validateUser, createUser);
router.route("/:id").get(singleUser).patch(updateUser).delete(deleteUser);

export { router as userRoutes };
