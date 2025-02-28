import { z } from "zod";
export const validateCreateBrand = z.object({});
export const validateGetBrands = z.object({});
export const validateGetSingleBrand = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
});
export const validateUpdateBrand = z.object({});
export const validateDeleteBrand = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
});
export const validateGetBrandsByCategory = z.object({});