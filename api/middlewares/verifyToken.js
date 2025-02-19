import jwt from "jsonwebtoken";
import {
  auth_not_role_403,
  forbidden,
  no_token_401,
  not_authenticate_401,
  unauthorized,
} from "../constants/index.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(unauthorized).json({ message: no_token_401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    //
    // const verified = jwt.verify(
    //   token,
    //   process.env.JWT_ACCESS_TOKEN,
    //   (err, decoded) => {
    //     if (err)
    //       return res.status(403).json({
    //         message: auth_not_role_403,
    //         err: "Invalid or expired token:" || err.message,
    //       });
    //     req.user = decoded;
    //     console.log(decoded)
    //     next();
    //   }
    // );
    //

    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    return res.status(unauthorized).json({ message: not_authenticate_401 });
  }
};
export const privateRoute = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      console.log(req.user.role);
      next();
    } else {
      return res.status(forbidden).json({ message: auth_not_role_403 });
    }
  });
};
