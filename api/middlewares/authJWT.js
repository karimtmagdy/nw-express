import jwt from "jsonwebtoken";
import {
  invalid_token,
  jwt_access_token,
  no_token,
  not_admin,
  verification_failed,
} from "../lib/constants.js";

export const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: no_token });
  try {
    jwt.verify(token, jwt_access_token, (err, decode) => {
      if (err)
        return res.status(403).json({
          message: verification_failed || err.message,
        });
      req.user = decode;
      next();
      console.log(decode);
    });
  } catch (error) {
    return res.status(401).json({ message: invalid_token });
  }
};
export const privateRoute = (req, res, next) => {
  verifyJWT(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: not_admin });
    }
  });
};

export const checkUser = (req, res, next) => {
  verifyJWT(req, res, () => {
    if (req.user.id === req.params.id) {
      console.log(req.user.id, req.params.id);
      next();
    } else {
      return res.status(403).json({ message: "not authorized user" });
    }
  });
};

// export const verifyJWT = (req, res, next) => {};
// export const publicRoute = (req, res, next) => {};
// export const checkAuth = (req, res, next) => {};
// export const checkAdmin = (req, res, next) => {};
