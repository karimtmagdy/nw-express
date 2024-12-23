import "dotenv/config";
import { database } from "./config/db.js";
import express from "express";
// import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'
import MongoStore from "connect-mongo";
import cors from "cors";
import session from "express-session";
import morgan from "morgan";

// database();
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
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: "newave",
      collectionName: "sessions",
      clientPromise: database(),
    }),
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

app
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`started development app on port ${port}`);
      process.exit(1);
    }
  });
