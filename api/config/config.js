import session from "express-session";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { corsOption } from "./corsOption.js";
import { development } from "./constants.js";
import MongoConectedStore from "connect-mongo";
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
// app.use(
//   session({
//     secret: process.env.JWT_SECRET_KEY, // مفتاح الجلسة
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URI,
//       dbName: "newave",
//       clientPromise: database(),
//       mongoOptions: {
//         // useNewUrlParser: true,
//         // useUnifiedTopology: true,
//       },
//       serializer: JSON.stringify,
//       deserializer: JSON.parse,
//     }),
//     cookie: {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // كوكيز آمنة فقط في بيئة الإنتاج
//       sameSite: "strict",
//       maxAge: 1000 * 60 * 60 * 24 * 30,
//       // maxAge: parseInt(process.env.JWT_EXPIRE_AT),
//       // maxAge: 1000 * 60 * 60 * 24 * 30 * parseInt(process.env.JWT_EXPIRE_AT),
//     },
//   })
// );
