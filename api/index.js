import "dotenv/config";
import express from "express";
import cors from "cors";
import { database } from "./config/db.js";
import { RouterAPI } from "./routes/index.js";



database();
const app = express();
app.use(express.json());
app.use(cors());
RouterAPI(app);
app.listen(process.env.PORT, () => {
  console.log("Server is running on port 8000");
});
