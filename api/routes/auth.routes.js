import { Router } from "express";
import { register } from "../services/auth/sign-up.service.js";
import { login } from "../services/auth/sign-in.service.js";
import { logout } from "../services/auth/sign-out.service.js";

const router = Router();
router.post("/sign-up", register);
router.post("/sign-in", login);
// router.get("/refresh", refresh);
router.post("/sign-out", logout);
export { router as authRoutes };
// router.get('/protected-route', verifyToken, protectedRoute);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);
// router.post("/google-sign-in", googleSignIn);
// router.post("/change-password", verifyToken, changePassword);
// router.post("/check-auth", verifyToken, checkAuth);
// router.post("/verify-email", verifyToken, verifyEmail);
