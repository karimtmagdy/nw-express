import { fn } from "../../lib/utils.js";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import { signToken } from "../../lib/token.js";

export const login = fn(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "all fields empty are required" });
  const user = await User.findOne({ email }).exec();
  if (!user) return res.status(400).json({ message: "user not available" });
  const match = bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });
  const pay = { id: user._id, role: user.role, email: user.email };
  const token = signToken(pay, "JWT_ACCESS_TOKEN", "1m");

  const id = user._id;
  // const refreshToken = signToken(id, "JWT_REFRESH_TOKEN", "2m");
  user.last_login = new Date();
  // user.refreshToken = refreshToken;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.joinedAt;
  delete userObject.updatedAt;
  await user.save();
  res.cookie("token", token, { httpOnly: true, secure: true });
  // res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
  res.status(200).json({
    status: "success",
    message: `Welcome back ${user.username}`,
    user: userObject,
    token,
  });
});
