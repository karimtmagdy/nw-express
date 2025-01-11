import { Router } from "express";
import { login } from "../services/authentication/sign-in.service.js";

const router = Router();

router.post("/sign-in", login);

export { router as authRouter };
