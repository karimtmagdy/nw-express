import { authRoutes } from "./auth.routes.js";
import { usersRoutes } from "./user.routes.js";
import { categoriesRoutes } from "./category.routes.js";
// import { subCategoryRoutes } from "./subcategory.routes.js";
// import { uploadRoutes } from "./upload.routes.js";

const api = "/api/v1";
export const RouterApiApplication = (app) => {
  app.use(`${api}/auth`, authRoutes);
  app.use(`${api}/users`, usersRoutes);
  app.use(`${api}/categories`, categoriesRoutes);
  // app.use(`${api}/subcategories`, subCategoryRoutes);

  //   app.use(`${api}/products`, productRoutes);
  //   app.use(`${api}/brands`, brandRoutes);
  //   app.use(`${api}/auth`,);
};

// .use("/api/v1/profile", profileRoutes);
// .use("/api/v1/account", accountRoutes);

// .use("/api/v1/upload", uploadRoutes);
// .use('/api/v1/profile',profileRoutes)
// .use('/api/v1/orders',orderRoutes)
// .use('/api/v1/admin',adminRoutes)
