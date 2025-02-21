import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { jwt_access_token, jwt_refresh_token } from "./constants.js";

export const fn = (callback) => asyncHandler(callback);

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true, //process.env.NODE_ENV === "production",
  sameSite: "None",
  maxAge: 24 * 60 * 60 * 1000,
};

export const generateAccessToken = (payload) => {
  return jwt.sign({ ...payload }, jwt_access_token, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign({ ...payload }, jwt_refresh_token, {
    expiresIn: "1d",
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, jwt_access_token);
};

export const getPagination = (total, query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  return { page, limit, skip, total };
};
