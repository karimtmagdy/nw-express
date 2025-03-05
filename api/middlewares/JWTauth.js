import jwt from "jsonwebtoken";
import {
  invalid_token,
  not_admin,
  unauthorized,
} from "../constants/constants.js";
import User from "../models/user.model.js";

// ✅ التحقق من صحة التوكن
export const JWTauth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).json({ message: unauthorized });
  try {
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    req.user = jwt.decode(token);
    console.log(jwt.decode(token));
    next();
  } catch (error) {
    return res.status(401).json({ message: invalid_token });
  }
};

// ✅ التحقق من أن المستخدم لديه دور المسؤول (Admin)
export const isAdmin = (req, res, next) => {
  JWTauth(req, res, () => {
    if (req.user.role === "admin") {
      console.log(req.user.role);
      next();
    } else {
      console.log(req.user.role);
      return res.status(403).json({ message: not_admin });
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

// ✅ حماية المسارات الخاصة - يحتاج فقط إلى توكن صالح
export const privateRoute = async (req, res, next) => {
  await JWTauth(req, res, async () => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new Error("User not found!", 404));
      }
      req.user = user;
      next();
    } catch (error) {
      return next(new Error("Unauthorized access!", 401));
    }
  });
};
