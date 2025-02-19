import { z } from "zod";
import { fn } from "../lib/utils.js";
// const formatDisplayname = (display_name) => `@${display_name.replace(/\s+/g, ".")}`;
export const registerSchema = z
  .object({
    // display_name: z.string().transform(formatDisplayname),
    username: z
      .string()
      .nonempty("username is required")
      .min(3, { message: "username must be at least 3 characters" })
      .max(32, { message: "username must be less than 32 characters" }),
    email: z
      .string()
      .nonempty("email is required")
      .email({
        message: "Invalid email address",
      })
      .transform((email) => email.toLowerCase()),
    password: z
      .string()
      .nonempty("password is required")
      .min(6, { message: "password must be at least 6 characters" })
      .max(32, { message: "password must be less than 32 characters" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "passwords do not match",
    path: ["confirm_password"],
  });
export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("username is required")
    .email({
      message: "Invalid email address",
    })
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .nonempty("password is required")
    .min(6, { message: "password must be at least 6 characters" })
    .max(32, { message: "password must be less than 32 characters" }),
});
export const validateRegister = fn(async (req, res, next) => {
  await registerSchema.parseAsync(req.body);
  next();
});

export const validateLogin = fn(async (req, res, next) => {
  await loginSchema.parseAsync(req.body);
  next();
});
