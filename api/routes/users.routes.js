import { Router } from "express";
import { deleteUser, getUsers, updateUser } from "../services/user.service.js";
import { validate } from "../middlewares/validate.js";
import {
  deleteUserSchema,
  updateUserSchema,
} from "../validation/user.validate.js";
import { privateRoute } from "../middlewares/authJWT.js";

const router = Router();
router.use(privateRoute);
router.route("/").post().get(getUsers);
router
  .route("/:id")
  .get()
  .patch(validate(updateUserSchema), updateUser)
  .delete(validate(deleteUserSchema), deleteUser);

export { router as usersRoutes };
