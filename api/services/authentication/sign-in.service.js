import { COOKIE_OPTIONS, fn } from "../../lib/utils.js";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = fn(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!email || !password) {
    return res.status(400).json({ message: "all fields empty are required" });
  }
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  const match = bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ message: "Invalid email or password" });
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_TOKEN,
    { expiresIn: "1m" }
  );
  const refreshToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: "1m" }
  );
  //  const token = generateToken({ _id: user._id, role: user.role });
  res.cookie("token", token, refreshToken, COOKIE_OPTIONS);
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.joinedAt;
  delete userObject.updatedAt;

  res.status(200).json({
    status: "success",
    message: `Welcome back ${user.username}`,
    user: userObject,
  });
});
