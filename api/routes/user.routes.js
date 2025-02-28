import { Router } from "express";
import { getSingleUserById, getUsers } from "../services/user.service.js";
import { validate } from "../middlewares/validate.js";
import { getUserSchema } from "../validation/user.validate.js";
const router = Router();
router.route("/").post().get(getUsers);
router
  .route("/:id")
  .get(validate(getUserSchema, "params"), getSingleUserById)
  .patch()
  .delete();

export { router as usersRoutes };
