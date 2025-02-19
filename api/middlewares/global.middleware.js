import { ZodError } from "zod";
// import ApiError from "../lib/api.error.js";

const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    stack: err.stack,
    errors: err.errors || null, // لعرض الأخطاء الإضافية في وضع التطوير
  });
};
const sendErrorProd = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Internal server error",
  });
};

// const handleJwtInvalid = () => new ApiError("Invalid token", 401);
// const handleJwtExpired = () => new ApiError("Expired token", 403);

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // معالجة أخطاء Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "fail",
      message: "Validation error",
      errors: err.errors,
    });
  }
  // التحقق من البيئة وتقديم استجابة مناسبة
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    // if (err.name === "JsonWebTokenError") err = handleJwtInvalid();
    // if (err.name === "TokenExpiredError") err = handleJwtExpired();
    sendErrorProd(err, res);
  }
  next();
};
