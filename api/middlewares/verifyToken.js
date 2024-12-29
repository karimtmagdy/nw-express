import jwt from "jsonwebtoken";
import { fn } from "../lib/utils.js";

export const verifyToken = fn(async (req, res, next) => {
  const authToken = req.headers.authorization || req.headers.Authorization;
  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
      req.user = decoded//.userId;
      next();
    } catch (error) {
      res.status(401).json({ message: "invalid token access denied" });
    }
  } else {
    res.status(401).json({ message: "no token provided authorization" });
  }
});
