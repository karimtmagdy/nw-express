import { Router } from "express";
// import { isAdmin } from "../middlewares/JWTauth.js";
// import { validID } from "../middlewares/validID.js";
import {   getProducts    } from "../services/product.service.js";

const router = Router();
router.route('/').post( ).get(getProducts );
router.route('/:id').get( ).patch(  ).delete( );
export { router as productsRoutes };