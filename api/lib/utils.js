import asyncHandler from "express-async-handler";
import NodeCache from "node-cache";
import jwt from "jsonwebtoken";

export const fn = (fn) => asyncHandler(fn);
export const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });


export const generateToken = (payload) => {
  return jwt.sign({ userId: payload }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};
export const generateCacheKey = (model, params) => {
  const key = `${model}_${JSON.stringify(params)}`;
  return key;
};

export const clearCache = (model, params) => {
  const key = generateCacheKey(model, params);
  cache.del(key);
};
export const pagination = (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};