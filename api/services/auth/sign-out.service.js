import { fn } from "../../lib/utils.js";
import User from "../../models/user.model.js";

export const logout = fn(async (req, res) => {
  // const token = req.headers.cookie?.token || req.headers.authorization.split(" ")[1];
  const user = await User.findOne(req.user).exec();
  // console.log("req", req.headers.authorization.split(" ")[1]);
  if (!user) return res.status(400).json({ message: "user not found" });
  user.refreshToken = null;
  await user.save();
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  return res.status(200).json({ message: "sign out successfully" });
});
