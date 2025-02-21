// import { globalErrorHandler } from "./global.middleware.js";
export const Middleware = (app) => {
  app.all("*", (req, res, next) => {
    next(new Error(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  app.use((req, res, next) => {
    if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
      return res.status(204);
    }
    next();
  });
  // app.use(globalErrorHandler);
};
