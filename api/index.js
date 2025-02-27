import "dotenv/config";
import express from "express";
const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;
const development = process.env.NODE_ENV === "development";
app.listen(port, () => {
  console.log(
    `Server started in ${
      development ? "development" : "production"
    } mode on port ${port}`
  );
});
