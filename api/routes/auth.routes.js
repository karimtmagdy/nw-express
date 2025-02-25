import { Router } from "express";
import { register } from "../services/auth/sign-up.service.js";
import { login } from "../services/auth/sign-in.service.js";
import { refresh } from "../services/auth/refresh-token.service.js";

const router = Router();

router.post("/sign-up", register);
router.post("/sign-in", login);
router.get("/refresh", refresh);
// router.post("/sign-in", validate(signinSchema), login);
// router.post("/sign-out", logout);
export { router as authRoutes };
