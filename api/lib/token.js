import jwt from "jsonwebtoken";
export const signToken = (payload, param, expiry) => {
  return jwt.sign({ ...payload }, process.env[param], {
    expiresIn: expiry,
  });
};
export const verifyToken = (token, param) => {
  return jwt.verify(token, process.env[param]);
};
