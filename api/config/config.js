import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { corsOption } from "./cors-option.js";
import { development } from "../constants/env.js";
export const ConfigurationApplication = (app) => {
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
