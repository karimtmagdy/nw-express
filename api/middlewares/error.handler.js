import ApiError from "../lib/api.error.js";

// ✅ دالة لمعالجة خطأ `CastError` في Mongoose
export const handleCastErrorDB = (err) => {
  const message = `Invalid value for field '${err.path}': ${err.value}`;
  return new ApiError(message, 400);
};
export const handleJwtInvalid = () => new ApiError("Invalid token", 401);
export const handleJwtExpired = () => new ApiError("Expired token", 403);

// ✅ التعامل مع الخطأ عند تكرار البيانات في قاعدة البيانات
export const handleDuplicatedFieldDB = (err) => {
  const value = Object.values(err.keyValue).join(", ");
  const message = `Duplicate field value: "${value}". Please use another value.`;
  return new ApiError(message, 400);
};

// ✅ التعامل مع أخطاء التحقق من البيانات (Validation Errors)
export const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(" ")}`;
  return new ApiError(message, 400, errors);
};
