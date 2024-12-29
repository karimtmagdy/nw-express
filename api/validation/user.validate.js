import { z } from "zod";
import { fn } from "../lib/utils.js";

const formatDisplayname = (username) =>
  `@${username.replace(/\s+/g, "." || "-")}`;

const userSchema = z.object({
  display_name: z.string().transform(formatDisplayname).optional(),
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
  photo_avatar: z.object({
    url: z.string(),
    public_id: z.string(),
  }),
  gender: z.string().nonempty("gender is required"),
});

const validateUser = fn(async (req, res, next) => {
  await userSchema.parseAsync(req.body);
  next();
});

export { validateUser };
