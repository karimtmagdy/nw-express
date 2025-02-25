import { ZodError } from "zod";
import ApiError from "../lib/api.error.js";
const sendErrorProd = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err instanceof ZodError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors,
    });
  }
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // let error = { ...err };
    if (err.name === "JsonWebTokenError") err = handleJwtInvalid();
    if (err.name === "TokenExpiredError") err = handleJwtExpired();
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicatedFieldDB(err);
    if (err.message === "Validation failed") err = handleValidationErrorDB(err);
    sendErrorProd(err, res);
  }
  next();
};
const handleJwtInvalid = () => new ApiError("Invalid token", 401);
const handleJwtExpired = () => new ApiError("Expired token", 403);
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new ApiError(message, 400);
};
const handleDuplicatedFieldDB = (err) => {
  const value = Object.values(err.keyValue).join(", ");
  const message = `Duplicate field value: ${value}. please use another value!`;
  return new ApiError(message, 400);
};
const handleValidationErrorDB = (err) => new ApiError("");
