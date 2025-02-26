import ApiError from "../../lib/api.error.js";
import { signToken } from "../../lib/token.js";
import { fn } from "../../lib/utils.js";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";

export const login = fn(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!email || !password) return new ApiError("all fields are required", 400);
  if (!user) return new ApiError("Invalid credentials", 400);
  const match = bcrypt.compare(password, user.password);
  if (!match) return new ApiError("Invalid email or password", 400);

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
    path: "/",
  });
  res.status(200).json({
    status: "success",
    message: `Welcome back ${user.username}`,
    user: userObject,
    token,
    refreshToken,
  });
});
