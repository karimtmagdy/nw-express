import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { database } from "./config/db.js";
database();
const app = express();
app.use(express.json());

const port =process.env.PORT || 8000
const development =process.env.NODE_ENV


app.get("/", (req, res) => {
  res.send('hello world');
});
app.use((req, res, next) => {
    if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
      return res.status(204);
    }
    next();
  });
app
  .listen(port, () => {
    console.log(
      `started ${
        development ? "development" : "production"
      } on port ${port}`
    );
  }).on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`error: Port ${port} is already in use.`);
        process.exit(1);
      }
    });process.on("unhandledRejection", (err) => {
        console.error(`Unhandled Rejection: (${err.name} - ${err.message})`);
        server.close(() => {
          console.error("Shutting down server...");
          process.exit(1);
        });
      });
      