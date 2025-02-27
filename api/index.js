import "express-async-errors";
import "dotenv/config";
import express from "express";
import { startServerApplication } from "./server.js";
import { ConfigurationApplication } from "./config/config.js";
import { database } from "./config/db.js";
import { MiddlewareApplication } from "./middlewares/Middleware.js";

database();
const app = express();
app.use(express.urlencoded({ extended: true }));
ConfigurationApplication(app);
app.use(express.json());
// RouterApiApplication(app);
// app.get("/api/v1/protected", verifyJWT, (req, res) => {
//   res.json({ message: "This is a protected route", userId: req.user });
// });
MiddlewareApplication(app);
startServerApplication(app);
