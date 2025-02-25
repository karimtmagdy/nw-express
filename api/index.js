import "dotenv/config";
import express from "express";

import { development, port } from "./constants/env.js";
import { database } from "./config/db.js";
import { ConfigurationApplication } from "./config/config.js";
import { MiddlewareApplication } from "./middlewares/Middleware.js";
import { RouterApiApplication } from "./routes/index.js";

database();
const app = express();
app.use(express.urlencoded({ extended: true }));
ConfigurationApplication(app);
app.use(express.json());

RouterApiApplication(app);

// Middleware
MiddlewareApplication(app);
const server = app.listen(port, () =>
  console.log(`started ${development} on port ${port}`)
);
process.on("unhandledRejection", (err) => {
  console.log(`Logged Error: (${err.name} - ${err.message})`);
  // server.close(() => {
  //   console.error("Shutting down server.");
  //   process.exit(1);
  // });
});
