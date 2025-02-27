import {ZodError}from 'zod'
import { development } from "../constants/env.js";
import {
  handleCastErrorDB,
  handleDuplicatedFieldDB,
  handleJwtExpired,
  handleJwtInvalid,
  handleValidationErrorDB,
} from "./error.handler.js";

// ✅ إرسال الأخطاء في بيئة الإنتاج
const sendErrorProd = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.isOperational ? err.message : "Something went wrong!",
  });
};

// ✅ إرسال الأخطاء في بيئة التطوير
const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // التعامل مع أخطاء Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid input data",
      errors: err.errors,
    });
  }

  // التعامل مع أخطاء Mongoose و JWT
  if (err.name === "JsonWebTokenError") err = handleJwtInvalid();
  if (err.name === "TokenExpiredError") err = handleJwtExpired();
  if (err.name === "CastError") err = handleCastErrorDB(err);
  if (err.code === 11000) err = handleDuplicatedFieldDB(err);
  if (err.message === "Validation failed") err = handleValidationErrorDB(err);

  // إرسال الخطأ بناءً على بيئة التشغيل
  development ? sendErrorDev(err, res) : sendErrorProd(err, res);
};
