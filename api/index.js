import "dotenv/config";
// import "express-async-errors";

import ApiError from "./lib/api.error.js";
import { database } from "./config/db.js";
import { RoutesAPI } from "./routes/index.js";
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

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://newave-store.vercel.app",
      "http://localhost:1573",
      "*",
    ],
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
      clientPromise: database(),
      mongoOptions: {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      },
      serializer: JSON.stringify,
      deserializer: JSON.parse,
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // كوكيز آمنة فقط في بيئة الإنتاج
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      // maxAge: parseInt(process.env.JWT_EXPIRE_AT),
    },
  })
);
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
RoutesAPI(app);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/favicon.ico", (req, res) => {
  res.status(204).send();
});

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});
const port = process.env.PORT || 8000;

app
  .listen(port, () => {
    console.log(`started development app on port ${port}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`error: Port ${port} is already in use.`);
      process.exit(1);
    }
  });
