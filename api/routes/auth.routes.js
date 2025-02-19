import { Router } from "express";
import { register } from "../services/auth/sign-up.service.js";
import { login } from "../services/auth/sign-in.service.js";
import { logout } from "../services/auth/sign-out.service.js";
import { refresh } from "../services/auth/refresh-token.service.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
router.post("/sign-up", register);
router.post("/sign-in", login);
router.post("/sign-out", authenticateToken, logout);
router.post("/refresh", refresh);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);
// router.post("/google-sign-in", googleSignIn);
// router.post("/change-password", verifyToken, changePassword);
// router.post("/check-auth", verifyToken, checkAuth);

export { router as authRoutes };
