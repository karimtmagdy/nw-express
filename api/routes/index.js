import { categoryRoutes } from "./category.routes.js";
import { authRoutes } from "./auth.routes.js";

export const RoutesAPI = (app) => {
  app
    .use("/api/v1/auth", authRoutes)
    //   .use("/api/v1/users", userRoutes)
    .use("/api/v1/categories", categoryRoutes);
  //   .use("/api/v1/products", productRoutes);
  // .use(/api/v1/,)

  // .use('/api/v1/subcategories',subCategoryRoutes)
  // .use('/api/v1/profile',profileRoutes)
  // .use('/api/v1/products',productRoutes)
  // .use('/api/v1/orders',orderRoutes)
  // .use('/api/v1/admin',adminRoutes)
  // .use('/api/v1/brands',brandRoutes)
};
