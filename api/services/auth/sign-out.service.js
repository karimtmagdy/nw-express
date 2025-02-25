import { fn } from "../../utils.js";
import User from "../../models/user.model.js";
import ApiError from "../../lib/api.error.js";
export const logout = fn(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return new ApiError("User not found", 404);
  res.clearCookie("token", { httpOnly: true, secure: true, maxAge: 0 });
  res.clearCookie("refreshToken", { httpOnly: true, secure: true, maxAge: 0 });
  res.status(200).json({ status: "success", message: "user signed out." });
});
