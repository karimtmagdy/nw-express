import { z } from "zod";

export const validateCreateUser = z.object({
  username: z
    .string()
    .nonempty({ message: "Username is required" })
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(32, {
      message: "Username must be less than 32 characters long",
    }),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password must be less than 32 characters" }),
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
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(32, { message: "Username must be less than 32 characters" })
    .optional(),
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
