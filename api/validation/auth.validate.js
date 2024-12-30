import { z } from "zod";
const formatDisplayname = (username) =>
  `@${username.replace(/\s+/g, "." || "-")}`;
export const signUpSchema = z
  .object({
    display_name: z.string().transform(formatDisplayname).optional(),

    username: z
      .string({
        description: "please enter a valid username",
        coerce: true,
        errorMap: () => ({ message: "please enter a valid username" }),
      })
      .describe("enter your username")
      .nonempty({ message: "Username is required" })
      .min(3)
      .max(32),
    email: z
      .string({
        description: "please enter a valid email",
        errorMap: () => ({ message: "please enter a valid email" }),
      })
      .describe("enter your email")
      .email({ message: "Invalid email address" })
      .nonempty({ message: "Email is required" })
      .toLowerCase(),
    password: z
      .string({
        message: "please enter a valid password",
        errorMap: () => ({ message: "please enter a valid password" }),
      })
      .describe("enter your password")
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(32, { message: "Password must be at most 32 characters" }),
    confirm_password: z
      .string()
      .nonempty({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
  
export const signInSchema = z
  .object({
    email: z
      .string({
        description: "please enter a valid email",
        errorMap: () => ({ message: "please enter a valid email" }),
      })
      .describe("enter your email")
      .email({ message: "Invalid email address" })
      .nonempty({ message: "Email is required" })
      .toLowerCase(),
    password: z
      .string({
        message: "please enter a valid password",
        errorMap: () => ({ message: "please enter a valid password" }),
      })
      .describe("enter your password")
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(32, { message: "Password must be at most 32 characters" }),
  })
  .required();
