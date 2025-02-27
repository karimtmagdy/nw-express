import "dotenv/config";
import express from "express";
import { startServerApplication } from "./server.js";
const app = express();
app.use(express.json());
startServerApplication(app);