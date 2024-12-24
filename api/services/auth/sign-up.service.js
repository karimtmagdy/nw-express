import { fn, generateToken } from "../../lib/utils.js";
import User from "../../models/user.model.js";
import slugify from "slugify";

export const register = fn(async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({
    $or: [{ email }, { username }],
  }).exec();
  if (existing) {
    return res
      .status(400)
      .json({ status: "fail", message: "user already exists", exists: true });
  }
  const user = await User.create({
    username,
    email,
    password,
    slug: slugify(username),
  });
  const userObject = user.toObject();
  delete userObject.joinedAt;
  delete userObject.updatedAt;
  delete userObject.password;
  const token = generateToken({
    userId: user._id,
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role,
  });
  await user.save();
  res
    .status(201)
    .json({
      status: "success",
      message: "user registered successfully",
      user: userObject,
      token,
    });
});
