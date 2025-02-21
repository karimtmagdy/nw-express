import { z } from "zod";
// nikename: z

export const signupSchema = z
  .object({
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
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "passwords do not match",
    path: ["confirm_password"],
  });

export const signinSchema = z.object({
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
