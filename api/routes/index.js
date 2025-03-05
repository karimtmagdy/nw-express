import { authRoutes } from "./auth.routes.js";
import { usersRoutes } from "./user.routes.js";
import { categoriesRoutes } from "./category.routes.js";
import { subcategoriesRoutes } from "./subcategory.routes.js";
// import { uploadRoutes } from "./upload.routes.js";

const api = "/api/v1";
export const RouterApiApplication = (app) => {
  app.use(`${api}/auth`, authRoutes);
  app.use(`${api}/users`, usersRoutes);
  app.use(`${api}/categories`, categoriesRoutes);
  app.use(`${api}/subcategories`, subcategoriesRoutes);
  //   app.use(`${api}/brands`, brandRoutes);
  //   app.use(`${api}/products`, productRoutes);
  //   app.use(`${api}/orders`,orderRoutes);
};

// .use("/api/v1/profile", profileRoutes);
// .use("/api/v1/account", accountRoutes);
// .use("/api/v1/upload", uploadRoutes);
// .use('/api/v1/profile',profileRoutes)
