import { COOKIE_OPTIONS } from "../../lib/utils.js";
export const logout = (req, res) => {
  res.clearCookie("token", {
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });
  res.clearCookie("refresh-token", {
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });
  res.status(200).json({ status: "success", message: "user signed out." });
};
