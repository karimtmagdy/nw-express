import { fn } from "../../lib/utils.js";
import User from "../../schema/user.model.js";
import bcrypt from "bcryptjs";
// import { generateToken } from "../authentication/token.service.js";
import slugify from "slugify";
export const register = fn(async (req, res) => {
  const exists = await User.findOne({ email: req.body.email });
  if (exists) {
    return res.status(400).json({ message: "user already exists" });
  }
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
    slug: slugify(req.body.username, { lower: true }),
  });
  await user.save();
  res
    .status(201)
    .json({ status: "success", message: "user created successfully", user });
});
