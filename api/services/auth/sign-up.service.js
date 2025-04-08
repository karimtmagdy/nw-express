import { create_success, fields_empty } from "../../constants/constants.js";
import { fn } from "../../lib/utils.js";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import slugify from "slugify";
export const register = fn(async (req, res) => {
  const { username, email, password , role} = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: fields_empty });
  const existing = await User.exists({ email }).exec();
  if (existing) return res.status(409).json({ message: "user already exists" });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
 
  const userdata = {
    username,
    email,
    password: hashPassword,
    slug: slugify(username),
  };
  const user = await User.create(userdata);
  const userObject = user.toObject();
  if(role==='user'){
    delete userObject.permission || undefined;
  }
  delete userObject.password;
  delete userObject.joinedAt;
  delete userObject.updatedAt;
  res.status(201).json({
    status: "success",
    message: `user ${create_success}`,
    user: userObject,
  });
});
