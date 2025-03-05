import { fn } from "../../lib/utils.js";
import User from "../../models/user.model.js";
import crypto from "crypto";
export const forgotPassword = fn(async (req, res) => {
  const { email } = req.body;
  const user = await User.exists({ email });
  if (!user) return res.status(404).json({ message: "User not available" });
  const resetPasswordToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = resetPasswordToken;
  const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1hr
  user.resetPasswordExpireAt = resetPasswordExpiresAt;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "Reset password token sent to your email",
    resetPasswordToken,
  });
});
