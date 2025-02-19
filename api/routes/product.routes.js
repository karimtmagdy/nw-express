import { Router } from "express";
import { getProducts } from "../services/product.service.js";

const router = Router();
router.route("/").get(getProducts);

export { router as productRoutes };
