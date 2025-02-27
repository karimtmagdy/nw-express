import "dotenv/config";
import express from "express";
import { development, port } from "./constants/env.js";
// import { startServerApplication } from "./server.js";
// import { database } from ".";

// database();
const app = express();
app.use(express.json());
const server = app.listen(port, () => {
  console.log(
    `Server started in ${
      development ? "development" : "production"
    } mode on port ${port}`
  );
});
