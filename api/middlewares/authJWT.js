import jwt from "jsonwebtoken";
import { invalid_token, no_token, not_admin } from "../constants/constants.js";
export const verifyJWT = (req, res, next) => {
  const auth = req.headers.authorization || req.headers.authorization;
  if (!auth?.startsWith("Bearer "))
    return res.status(401).json({ message1: no_token });
  const authorized = auth.split(" ")[1];
  const token = req.cookies.token || authorized;
  if (!token) return res.status(401).json({ message2: no_token });
  try {
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decode) => {
      if (err) return res.status(403).json({ message3: `${err.message} 1` }); //|| invalid_token
      req.user = decode.user;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message4: `${error.message} 2` }); //"invalid token"
  }
};

export const privateRoute = (req, res, next) => {
  verifyJWT(req, res, () => {
    if (req.user.role === "admin") {
      console.log(req.user);
      next();
    } else {
      return res.status(403).json({ message: not_admin });
    }
  });
};
