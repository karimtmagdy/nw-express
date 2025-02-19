import { COOKIE_OPTIONS, fn } from "../../lib/utils.js";

export const logout = fn(async (req, res) => {
  res.clearCookie("token", {
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });
  res.status(200).json({ status: "success", message: "user signed out." });
});
