import { fn } from "../../lib/utils.js";
export const signOut = fn(async (req, res) => {
  if (req.headers.cookie) res.clearCookie("token");

  res.status(200).json({ status: "success", message: "user signed out." });
});
