import { authRoutes } from "./auth.routes.js";
import { userRoutes } from "./user.routes.js";
import { categoryRoutes } from "./category.routes.js";
import { brandRoutes } from "./brand.routes.js";
import { productRoutes } from "./product.routes.js";
// import { uploadRoutes } from "./upload.routes.js";
// import { adminProductRoutes } from "./admin/adminProduct.routes.js";
// import { adminCategoryRoutes } from "./admin/adminCategory.routes.js";

export const RouterAPI = (app) => {
  app
    .use("/api/v1/auth", authRoutes)
    .use("/api/v1/admin/users", userRoutes)
    .use("/api/v1/categories", categoryRoutes)
    // .use('/api/v1/subcategories',subCategoryRoutes)
    .use("/api/v1/brands", brandRoutes)
    .use("/api/v1/products", productRoutes);
  // .use("/api/v1/admin/categories", adminCategoriesRoutes);
  // .use("/api/v1/admin/subcategories", adminSubCategoriesRoutes);
  // .use("/api/v1/profile", profileRoutes);
  // .use("/api/v1/account", accountRoutes);
  // .use('/api/v1/admin')
  // .use("/api/v1/upload", uploadRoutes);
  // .use('/api/v1/profile',profileRoutes)
  // .use('/api/v1/orders',orderRoutes)
  // .use('/api/v1/admin',adminRoutes)
};
