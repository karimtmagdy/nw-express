import "dotenv/config";
import "express-async-errors";
import express from "express";
import { RouterAPI } from "./routes/index.js";
import { development, port } from "./lib/constants.js";
import { database } from "./config/db.js";
import { ConfigApp } from "./config/config.js";
import { Middleware } from "./middlewares/Middleware.js";

database();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
ConfigApp(app);

RouterAPI(app);
app.get("/", (req, res) => {
  res.send("<h1>Hello World! from vercel API NEWAVE V1.0.0 🚀</h1>");
});
// Middleware
Middleware(app);

const server = app.listen(port, () => {
  console.log(`started ${development} on port ${port}`);
});
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
  //
  if (development === "development") console.log(err);
  promise.then((r) => console.log(r));
});
