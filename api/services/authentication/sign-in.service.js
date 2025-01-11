import { fn } from "../../lib/utils.js";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = fn(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (!email || !password) {
    return res.status(400).json({ message: "email or password is required" });
  }
  if (!user) {
    return res.status(400).json({ message: "user does not exist" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "invalid email or password" });
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_TOKEN,
    { expiresIn: "1m" }
  );
  const refreshToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: "1d" }
  );
  res.cookie("token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res
    .status(200)
    .json({ status: "success", message: `Welcome back ${user.username}`, token });
});
