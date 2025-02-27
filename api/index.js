import "dotenv/config";
import express from "express";

// import { startServerApplication } from "./server.js";
import { database } from "./config/db.js";
import { RouterApiApplication } from "./routes/index.js";
import { pageWelcome } from "./constants/constants.js";

database();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(pageWelcome);
});
RouterApiApplication(app);
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(
    `Server started in ${
      process.env.NODE_ENV ? "development" : "production"
    } mode on port ${port}`
  );
});
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: (${err.name} - ${err.message})`);
  server.close(() => {
    console.error("Shutting down server...");
    process.exit(1);
  });
});
