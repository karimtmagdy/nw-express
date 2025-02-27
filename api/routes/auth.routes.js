import { Router } from "express";
import { login } from "../services/auth/sign-in.service.js";
const router = Router();
// router.post("/sign-up", register);
router.post("/sign-in", login);
// router.get("/refresh", refresh);
export { router as authRoutes };
