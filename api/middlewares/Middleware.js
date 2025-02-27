import ApiError from "../lib/api.error.js";
import { globalErrorHandler } from "./globalMiddleware.js";

export const MiddlewareApplication = (app) => {
  app.all("*", (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
  });
  app.use((req, res, next) => {
    if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
      return res.status(204);
    }
    next();
  });
  app.use(globalErrorHandler);
};
