import { fn, generateToken } from "../../lib/utils.js";
import User from "../../schema/user.model.js";
import bcrypt from "bcryptjs";

export const login = fn(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).exec();
  if (!user) {
    return res.status(400).json({ message: "user does not exist" });
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(400).json({ message: "invalid email or password" });
  }
  const token = generateToken({
    userId: user._id,
    username: user.username,
    display_name: user.display_name,
    email: user.email,
    role: user.role,
    photo: user.photo,
    isAdmin: user.isAdmin,
    gender: user.gender,
    joinedAt: user.joinedAt,
  });
  await user.save();
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.joinedAt;
  delete userObject.updatedAt;
  res.status(201).json({
    status: "success",
    message: `Welcome back ${userObject.username}`,
    user: userObject,
    token,
  });
});
