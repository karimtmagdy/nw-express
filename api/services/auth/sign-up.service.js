import { fn } from "../../lib/utils.js";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
export const register = fn(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "all fields empty are required" });
  const existing = await User.exists({ email }).exec();
  if (existing) return res.status(409).json({ message: "user already exists" });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ username, email, password: hashPassword });
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.joinedAt;
  delete userObject.updatedAt;
  res.status(201).json({
    status: "success",
    message: "user created successfully",
    user: userObject,
  });
});
