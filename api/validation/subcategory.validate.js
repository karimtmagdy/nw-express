import { z } from "zod";
export const validateCreateSubcategory = z.object({});
export const validateGetSubCategories = z.object({});
export const validateGetSingleSubCategory = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
});
export const validateUpdateSubCategory = z.object({});
export const validateDeleteSubCategory = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
});
export const validateGetSubCategoriesByCategory = z.object({});
export const validateGetSubCategoriesByCategorySlug = z.object({});
export const validateGetSubCategoriesByCategorySlugAndParent = z.object({});
