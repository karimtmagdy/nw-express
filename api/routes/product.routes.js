import { Router } from "express";
import { isAdmin } from "../middlewares/JWTauth.js";
import { validID } from "../middlewares/validID.js";
import { deleteProduct, getProducts, singleProduct, updateProduct } from "../services/product.service.js";

const router = Router();
router.route('/').post(isAdmin,    createCategory).get(getProducts);
router.route('/:id').get(validID, singleProduct).patch(isAdmin , updateProduct).delete(isAdmin, validID, deleteProduct);
export { router as productsRoutes };