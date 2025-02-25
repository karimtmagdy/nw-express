import { signToken } from "../../lib/token.js";
import { fn } from "../../lib/utils.js";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";

export const login = fn(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!email || !password)
    res.status(400).json({ message: "all fields empty are required" });
  if (!user) res.status(400).json({ message: "Invalid credentials" });
  const match = bcrypt.compare(password, user.password);
  if (!match) res.status(400).json({ message: "Invalid email or password" });

  const pay = { id: user._id, role: user.role };
  const token = signToken(pay, "JWT_ACCESS_TOKEN", "1m");
  const refreshToken = signToken({ id: user._id }, "JWT_REFRESH_TOKEN", "2m");

  user.last_login = new Date();
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.joinedAt;
  delete userObject.updatedAt;
  await user.save();
  res.cookie("token", token, { httpOnly: true, secure: true });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
  res.status(200).json({
    status: "success",
    message: `Welcome back ${user.username}`,
    user: userObject,
    token,
    refreshToken,
  });
});
