import "dotenv/config";
import { ConfigApp } from "./config/config.js";
import express from "express";
// import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'

ConfigApp(app);
const app = express();
const port = 8000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/favicon.ico", (req, res) => {
  res.status(204).send();
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
