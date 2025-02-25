import { Router } from "express";
import { getUsers } from "../services/user.service.js";
import { privateRoute } from "../middlewares/authJWT.js";

const router = Router();
router.use(privateRoute);
router.route("/").post().get(getUsers);
router.route("/:id").get().patch().delete();

export { router as usersRoutes };
