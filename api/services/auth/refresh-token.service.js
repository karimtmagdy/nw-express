import { COOKIE_OPTIONS, fn, generateAccessToken } from "../../lib/utils.js";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import { jwt_refresh_token, jwt_access_token } from "../../lib/constants.js";
export const refresh = fn(async (req, res) => {
  console.log(req.cookies);
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(refreshToken, jwt_refresh_token);
    const user = await User.findById(decoded.id);
    console.log(decoded);
    if (!user) {
      return res.status(403).json({ message: "Forbidden" });
    }
    // ✅ إنشاء `accessToken` جديد
    const token = generateAccessToken({ id: user._id, role: user.role });
    return res.cookie("token", token, COOKIE_OPTIONS);
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
});
