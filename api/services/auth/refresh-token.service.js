import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
export const refresh = (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.token)
    return res.status(401).json({ message: "unauthorized 1" });
  const refreshToken = cookie.token;
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN,
    async (err, decode) => {
      if (err) return res.status(403).json({ message: err.message }); //"forbidden ref"
      const user = await User.findById({ id: decode._id }).exec();
      console.log(decode)
      if (!user) return res.status(401).json({ message: "unauthorized 2" });
      const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: "1m",
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 60 * 1000,
      });
    }
  );
};
