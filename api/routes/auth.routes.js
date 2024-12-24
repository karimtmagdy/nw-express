import { Router } from "express";
import { register } from "../services/auth/sign-up.service.js";
import { login } from "../services/auth/sign-in.service.js";
import { signOut } from "../services/auth/sign-out.service.js";

import { validateRegister } from "../validation/auth.validate.js";
// import { protectedRoute } from "../utils/token.js";
// import { verifyToken } from "../middlewares/verifyToken.js";

// router.get('/protected-route', verifyToken, protectedRoute);
const router = Router();
router.post("/sign-up", validateRegister, register);
router.post("/sign-in", login);
router.post("/sign-out", signOut);
export { router as authRoutes };
