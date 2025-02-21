import session from "express-session";
import MongoConectedStore from "connect-mongo";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { corsOption } from "./corsOption.js";
import { development } from "../lib/constants.js";
import { database } from "./db.js";

export const SessionApp = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      store: MongoConectedStore.create({
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
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      },
    })
  );
};

export const ConfigApp = (app) => {
  app.use(cors(corsOption));
  app.use(cookieParser());
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
  // app.use(session({}));
  if (development === "development") app.use(morgan("dev"));
};

// app.use(express.static(uploadDir));
