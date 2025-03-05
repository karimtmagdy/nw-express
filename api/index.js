import "dotenv/config";
import express from "express";
// import { startServerApplication } from "./server.js";
import { database } from "./config/db.js";
import { RouterApiApplication } from "./routes/index.js";
import { pageWelcome } from "./constants/constants.js";
// import { ConfigurationApplication } from "./config/config.js";
import { development, port } from "./constants/env.js";

database();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// ConfigurationApplication(app);

app.get("/", (req, res) => {
  res.send(pageWelcome);
});
if (development === "development") app.use(morgan("dev"));
RouterApiApplication(app);
const server = app
  .listen(port, () => {
    console.log(
      `Server started in ${
        development ? "development" : "production"
      } mode on port ${port}`
    );
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`error: Port ${port} is already in use.`);
      process.exit(1);
    }
  });
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: (${err.name} - ${err.message})`);
  server.close(() => {
    console.error("Shutting down server...");
    process.exit(1);
  });
});
