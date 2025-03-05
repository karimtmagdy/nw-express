import asyncHandler from "express-async-handler";

export const fn = (callback) => asyncHandler(callback);

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure:  process.env.NODE_ENV === "production",
  sameSite: "None",
  maxAge: 24 * 60 * 60 * 1000,
};

export const getPagination = (total, query) => {
  const page = parseInt(query.page) * 1 || 1;
  const limit = parseInt(query.limit) * 1 || 10;
  const skip = (page - 1) * limit;

  return { page, limit, skip, total };
};
