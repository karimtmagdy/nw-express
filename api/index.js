import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import { RouterAPI } from "./routes/index.js";
import { development, port } from "./config/constants.js";
import { database } from "./config/db.js";
import { corsOption } from "./config/corsOption.js";
 
database();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));

// RouterAPI(app);
app.get("/", (req, res) => {
  res.send("<h1>Hello World! from vercel API NEWAVE V1.0.0 🚀</h1>");
});

app.use((req, res, next) => {
  if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
    return res.sendStatus(204);
  }
  next();
});
app.listen(port, () => {
  console.log(`started ${development} on port ${port}`);
});
