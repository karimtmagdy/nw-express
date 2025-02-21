import { authRoutes } from "./auth.routes.js";
import { usersRoutes } from "./users.routes.js";

export const RouterAPI = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", usersRoutes);
};
