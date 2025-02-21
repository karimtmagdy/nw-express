import User from "../../models/user.model.js";
import { fn } from "../../lib/utils.js";
import slugify from "slugify";
import bcrypt from "bcryptjs";

export const register = fn(async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await User.exists({ email });
  if (existing) {
    return res
      .status(400)
      .json({ status: "fail", message: "user already exists" });
  }
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ status: "fail", message: "all fields are required" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    username,
    email,
    password: hashPassword,
    slug: slugify(username),
  });
  const userObject = user.toObject();
  delete userObject.joinedAt;
  delete userObject.updatedAt;
  delete userObject.password;
  await user.save();
  res.status(201).json({
    status: "success",
    message: "user registered successfully",
    user: userObject,
  });
});
