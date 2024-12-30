import { Router } from "express";
import { register } from "../services/authentication/sign-up.service.js";
import { signInSchema, signUpSchema } from "../validation/auth.validate.js";
import { validateData } from "../validation/validate.js";
import { login } from "../services/authentication/sign-in.service.js";
const router = Router();

router.post("/sign-up", validateData(signUpSchema), register);
router.post("/sign-in", validateData(signInSchema), login);

export { router as authRouter };
