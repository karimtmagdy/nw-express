import { Router } from "express";
import { getUsers } from "../services/user.service.js";
const router = Router();
router.route("/").post().get(getUsers);
router.route("/:id").get().patch().delete();

export { router as usersRoutes };
