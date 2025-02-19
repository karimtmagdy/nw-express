import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  singleUser,
  updateUser,
} from "../services/user.service.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();
router.use(verifyToken);
router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(singleUser).patch(updateUser).delete(deleteUser);

export { router as userRoutes };
