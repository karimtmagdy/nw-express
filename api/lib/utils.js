import asyncHandler from "express-async-handler";
import NodeCache from "node-cache";

export const fn = (callback) => asyncHandler(callback);

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true, // NODE_ENV === "production",
  sameSite: "None",
  maxAge: 24 * 60 * 60 * 1000, // 30 days  -- 30 * 24 * 60 * 60 * 1000
  // maxAge: reminder ? reminder : expire,
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
  // const total = await app.countDocuments();
  // const pages = Math.ceil(total / limit);
  return { page, limit, skip, total };
};
