import { authRoutes } from "./auth.routes.js";
import { categoryRoutes } from "./category.routes.js";
import { subCategoryRoutes } from "./subcategory.routes.js";
import { usersRoutes } from "./user.routes.js";
const api = "/api/v1";
export const RouterApiApplication = (app) => {
  app.use(`${api}/auth`, authRoutes);
  app.use(`${api}/users`, usersRoutes);
  app.use(`${api}/categories`, categoryRoutes);
  app.use(`${api}/subcategories`, subCategoryRoutes);

  //   app.use(`${api}/products`,);
  //   app.use(`${api}/brands`,);
  //   app.use(`${api}/auth`,);
};
