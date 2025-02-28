import { z } from "zod";
export const validateCreateProduct = z.object({});
export const validateGetProducts = z.object({});
export const validateGetSingleProduct = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
});
export const validateUpdateProduct = z.object({});
export const validateDeleteProduct = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
});
