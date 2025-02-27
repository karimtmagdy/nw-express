import { Router } from "express";
import { login } from "../../new/services/auth/sign-in.service.js";
const router = Router();
// router.post("/sign-up", register);
router.post("/sign-in", login);
// router.get("/refresh", refresh);
// router.post("/sign-out", logout);
export { router as authRoutes };
