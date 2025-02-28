import { z } from "zod";

export const validateCreateUser = z.object({
  username: z.string().nonempty().min(3).max(32),
  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(6).max(32),
  gender: z.string().refine((val) => ["male", "female"].includes(val), {
    message: "Invalid gender",
  }),
  photo: z.string().optional(),
});
export const validateGetUsers = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  sort: z.string().optional(),
});
export const validateGetSingleUser = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
});
export const validateUpdateUser = z.object({
  username: z.string().min(3).max(32).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).max(32).optional(),
  gender: z
    .string()
    .optional()
    .refine((val) => ["male", "female"].includes(val), {
      message: "Invalid gender",
    }),
  photo: z.string().optional(),
});
export const validateDeleteUser = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
});
