import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  profilePhotoUpload,
  singleUser,
  updateUser,
} from "../services/user.service.js";
import { validateUser } from "../validation/user.validate.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router
  .route("/")
  .get(verifyToken, getUsers)
  .post(validateUser, createUser)
  .post(profilePhotoUpload);
router.route("/:id").get(singleUser).patch(updateUser).delete(deleteUser);

export { router as userRoutes };
