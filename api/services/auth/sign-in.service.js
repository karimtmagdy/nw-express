import { fn, generateToken } from "../../lib/utils.js";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";

export const login = fn(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({
    $or: [{ email }, { username }],
  }).exec();
  if (!user) {
    return res
      .status(404)
      .json({ status: "fail", message: "user not found", exists: true });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ status: "fail", message: "Wrong password" });
  }
  const userObject = user.toObject();
  delete userObject.joinedAt;
  delete userObject.updatedAt;
  delete userObject.password;
  const token = generateToken({
    userId: user._id,
    username: user.username,
    display_name: user.display_name,
    email: user.email,
    role: user.role,
    photo_avatar:user.photo_avatar,
    gender:user.gender,
    remember_me:user.remember_me,
    about:user.about,
  });
  if (user.role === "admin") {
    return res.status(200).json({
      status: "success",
      message: "Admin logged in successfully",
      user: userObject,
      token,
    });
  }
  await user.save();
  res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    user: userObject,
    token,
  });
});
