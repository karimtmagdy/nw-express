//origin: "http://localhost:5173", // السماح بطلبات من هذا الدومين فقط

// import { client, frontend, frontend_local } from "../constants/env.js";
// const allowedOrigins = [client, frontend, frontend_local];

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://newave-store.vercel.app",
];

export const corsOption = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // السماح بإرسال الكوكيز
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // السماح بهذه الطلبات فقط
  allowedHeaders: ["Content-Type", "Authorization", "Origin", "Accept"], // السماح بهذه الهيدرات
  optionsSuccessStatus: 200, // تجنب أخطاء في المتصفحات القديمة
};
