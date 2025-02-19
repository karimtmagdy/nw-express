import { Router } from "express";
import { createBrand, getBrands } from "../services/brand.service.js";

const router = Router();
router.route("/").get(getBrands).post(createBrand);

export { router as brandRoutes };
