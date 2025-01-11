import { fn } from "../../lib/utils.js";
import User from "../../models/user.model.js";
export const register = fn(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email }).exists();
});
