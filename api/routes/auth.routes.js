import { Router } from "express";
import { login } from "../services/auth/sign-in.service.js";
const router = Router();
router.post("/sign-in", login);
export { router as authRoutes };
