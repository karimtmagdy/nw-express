import { Router } from "express";
import { register } from "../services/auth/sign-up.service.js";
import { login } from "../services/auth/sign-in.service.js";
import { logout } from "../services/auth/sign-out.service.js";
import { refresh } from "../services/auth/refresh-token.service.js";
import { signinSchema, signupSchema } from "../validation/auth.validate.js";
import { validate } from "../middlewares/validate.js";
// import { privateRoute } from "../middlewares/authJWT.js";

const router = Router();

router.post("/sign-up", validate(signupSchema), register);
router.post("/sign-in", validate(signinSchema), login);
router.post("/sign-out", logout);
router.get("/refresh", refresh);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);
// router.post("/google-sign-in", googleSignIn);
// router.post("/change-password", verifyToken, changePassword);
// router.post("/check-auth", verifyToken, checkAuth);

// app.get("/protected", privateRoute, (req, res) => {
//   res.json({ message: "This is a protected route", user: req.user });
// });
export { router as authRoutes };
