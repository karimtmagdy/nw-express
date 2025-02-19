import asyncHandler from "express-async-handler";
import NodeCache from "node-cache";

export const fn = (callback) => asyncHandler(callback);

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "None",
  maxAge: 24 * 60 * 60 * 1000,
};
export const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });
export const generateCacheKey = (model, params) => {
  const key = `${model}_${JSON.stringify(params)}`;
  return key;
};

export const pagination = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const skip = (page - 1) * limit;
  return { limit, skip };
};
