import User from "../../models/user.model.js";
import { COOKIE_OPTIONS, fn } from "../../lib/utils.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = fn(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!email || !password) {
    return res.status(400).json({ message: "all fields empty are required" });
  }
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  const match = bcrypt.compareSync(password, user.password);
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

  res.cookie("token", token, COOKIE_OPTIONS);

  res.cookie("refresh-token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // استخدم `false` إذا كنت على localhost
    sameSite: "Strict",
    path: "/api/v1/auth/refresh",
    maxAge: 60 * 1000, //  1 دقيقة
    // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 أيام
  });

  user.last_login = new Date();

  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.joinedAt;
  delete userObject.updatedAt;

  await user.save();
  res.status(200).json({
    status: "success",
    message: `Welcome back ${user.username}`,
    user: userObject,
    // token,
    // refreshToken,
  });
});
