import "dotenv/config";
import "express-async-errors";
import express from "express";
import { RouterAPI } from "./routes/index.js";
import { development, port } from "./config/constants.js";
import { database } from "./config/db.js";
import { ConfigApp } from "./config/config.js";
// import { globalErrorHandler } from "./middlewares/global.middleware.js";

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
app.all("*", (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use((req, res, next) => {
  if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
    return res.sendStatus(204);
  }
  next();
});
// app.use(globalErrorHandler);
app.listen(port, () => {
  console.log(`started ${development} on port ${port}`);
});
