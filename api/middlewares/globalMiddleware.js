import { ZodError } from "zod";
const sendErrorProd = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Internal server error",
  });
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    stack: err.stack,
    errors: err.errors || null,
    data: err.data || null,
    error: err.error || null,
  });
};
// const handleJwtInvalid = () => new ApiError("Invalid token", 401);
// const handleJwtExpired = () => new ApiError("Expired token", 403);
export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err instanceof ZodError) {
    return res.status(err.statusCode || 400).json({
      status: err.status || "fail",
      message: err.message || "Validation error",
      errors: err.errors,
    });
  }
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    // if (err.name === "JsonWebTokenError") err = handleJwtInvalid();
    // if (err.name === "TokenExpiredError") err = handleJwtExpired();
    sendErrorProd(err, res);
  }
  next();
};
