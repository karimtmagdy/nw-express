import { authRouter } from "./auth.routes.js";
// import { userRouter } from "./user.routes.js";

export const RouterAPI = (app) => {
  app.use("/api/v1/auth", authRouter)
// .use("/api/v1/admin/users", userRouter);
};
// .use("/api/v1/users", userRouter);
// .use("/api/v1/profile", profileRouter);
// .use("/api/v1/account", accountRouter);
// .use("/api/v1/admin/products", productRouter);
