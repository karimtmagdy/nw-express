import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
export const fn = (callback) => asyncHandler(callback);
export const generateToken = (payload) => {
  return jwt.sign({ userId: payload }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};
