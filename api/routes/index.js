import { authRouter } from "./auth.routes.js";

export const RouterAPI = (app) => {
  app.use("/api/v1/auth", authRouter);
};
