import express from "express";
import cors from "cors";
import session from "express-session";
import morgan from "morgan";
export const ConfigApp = (app) => {
  // const app = express();
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:1573",
        "https://newave-store.vercel.app",
      ],
      credentials: true,
      optionsSuccessStatus: 200,
      methods: "GET,POST,PUT,PATCH,DELETE",
      exposedHeaders: "Content-Type,Authorization",
      allowedHeaders: "Content-Type,Authorization",
      preflightContinue: true,
    })
  );
  app.use(
    session({
      secret: process.env.JWT_SECRET_KEY, // مفتاح الجلسة
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // كوكيز آمنة فقط في بيئة الإنتاج
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      },
    })
  );
  if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
};
