// import { client, frontend, frontend_local } from "../constants/env.js";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://newave-store.vercel.app",
];
// const allowedOrigins = [client, frontend, frontend_local];
export const corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // السماح بإرسال الكوكيز
  methods: ["GET POST PUT PATCH DELETE"], // السماح بهذه الطلبات فقط
  allowedHeaders: ["Content-Type", "Authorization"], // السماح بهذه الهيدرات فقط
};

//origin: "http://localhost:5173", // السماح بطلبات من هذا الدومين فقط
   
    
   