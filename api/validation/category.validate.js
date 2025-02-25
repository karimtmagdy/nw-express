import { z } from "zod";
export const validateCreateCategory = z.object({
  name: z
    .string()
    .nonempty("category name is required")
    .min(3, { message: "category must be at least 3 characters" })
    .max(32, { message: "category name must be less than 32 characters long" }),
  description: z.string().nonempty(),
  createdBy: z.string().nonempty(),
});
export const validateGetCategories = z.object({});
export const validateGetSingleCategory = z.object({
  id: z.string().ip("_id"),
});
export const validateUpdateCategory = z.object({});
export const validateDeleteCategory = z.object({});

// validateCreateCategory
// validateGetCategories
// validateGetSingleCategory
// validateUpdateCategory
// validateDeleteCategory
