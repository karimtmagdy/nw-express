import jwt from "jsonwebtoken";
export const signToken = (payload, param, expire) => {
  return jwt.sign({ ...payload }, process.env[param], { expiresIn: expire });
};
export const verifyToken = (token, param) => {
  return jwt.verify(token, process.env[param]);
};
