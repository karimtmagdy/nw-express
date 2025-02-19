import { Router } from "express";
import { login } from "../services/authentication/sign-in.service.js";
import { register } from "../services/authentication/sign-up.service.js";
import { logout } from "../services/authentication/sign-out.service.js";
import {
  validateLogin,
  validateRegister,
} from "../validation/auth.validate.js";
import { refrech } from "../services/authentication/refrech-token.service.js";

const router = Router();

router.post("/sign-up", validateRegister, register);
router.post("/sign-in", validateLogin, login);
router.post("/sign-out", logout);
router.get("/refresh", refrech);

export { router as authRoutes };
// validateUp validateIn

// import { protectedRoute } from "../utils/token.js";
// import { verifyToken } from "../middlewares/verifyToken.js";

// router.get('/protected-route', verifyToken, protectedRoute);
