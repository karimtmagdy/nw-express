import "dotenv/config";
import { ConfigApp } from "./config/config.js";
import express from "express";
// import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'
import cors from "cors";
import session from "express-session";
import morgan from "morgan";
// ConfigApp(app);
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://newave.vercel.app", "*"],
    credentials: true,
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
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/favicon.ico", (req, res) => {
  res.status(204).send();
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
