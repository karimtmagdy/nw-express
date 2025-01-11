import { fn } from "../../lib/utils.js";
import User from "../../models/user.model.js";


export const login = fn(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exists();
  if (!email || !password) {
    return res.status(400).json({ message: "email or password is required" });
  }
  if (!user) {
    return res.status(400).json({ message: "user does not exist" });
  }
});
