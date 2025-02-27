import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../models/user.model.js";
import ApiError from "../lib/api.error.js";

// ✅ التحقق من صحة التوكن
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
      return next(new ApiError("Unauthorized! No token provided.", 401));
    }
    token = token.split(" ")[1];

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_ACCESS_TOKEN);
    req.user = decoded; // حفظ بيانات المستخدم في الطلب
    next();
  } catch (error) {
    return next(new ApiError("Invalid or expired token!", 401));
  }
};

// ✅ حماية المسارات الخاصة - يحتاج فقط إلى توكن صالح
export const privateRoute = async (req, res, next) => {
  await verifyToken(req, res, async () => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ApiError("User not found!", 404));
      }
      req.user = user;
      next();
    } catch (error) {
      return next(new ApiError("Unauthorized access!", 401));
    }
  });
};

// ✅ حماية المسارات المهمة - يمكن التوسع لاحقًا بصلاحيات إضافية
export const protectedRoute = async (req, res, next) => {
  await privateRoute(req, res, async () => {
    // يمكنك إضافة شرط هنا إذا كنت تريد حماية خاصة
    next();
  });
};

// ✅ التحقق من أن المستخدم لديه دور المسؤول (Admin)
export const isAdminRoute = async (req, res, next) => {
  await privateRoute(req, res, async () => {
    if (req.user.role !== "admin") {
      return next(new ApiError("Access denied! Admins only.", 403));
    }
    next();
  });
};
