import { Types } from "mongoose";
import { z } from "zod";

// جلب جميع المستخدمين (لا يوجد مدخلات)
export const getUsersSchema = z.object({});

// جلب مستخدم واحد
export const getUserSchema = z.object({
  _id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
});

// تحديث مستخدم
export const updateUserSchema = z.object({
  username: z.string().min(3).max(50).optional(),

  email: z.string().email().optional(),

  password: z.string().min(6).max(32).optional(),
  // phone: z.number().min(6).max(32).optional(),
  gender: z
    .string()
    .optional()
    .refine((val) => ["male", "female"].includes(val), {
      message: "Invalid gender",
    }),
  slug: z.string().optional(),
  photo: z.string().optional(),
});
export const deleteUserSchema = z.object({
  _id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
});
