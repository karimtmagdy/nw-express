import { z } from "zod";

export const signUpSchema = z
  .object({
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
    confirm_password: z
      .string()
      .nonempty({ message: "Confirm password is required" })
      .min(6, { message: "Confirm password must be at least 6 characters" })
      .max(32, { message: "Confirm password must be less than 32 characters" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const signInSchema = z
  .object({
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .email({ message: "Invalid email" })
      .transform((email) => email.toLowerCase()),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(32, { message: "Password must be less than 32 characters" }),
  })
 

// export const signOutSchema = z.object({}).required();
export const validateRegister = fn(async (req, res, next) => {
  await signUpSchema.parseAsync(req.body);
  next();
});

export const validateLogin = fn(async (req, res, next) => {
  await signInSchema.parseAsync(req.body);
  next();
});
