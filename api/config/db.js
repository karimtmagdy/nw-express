import mongoose from "mongoose";
import { db_pass, msg_api, uri } from "../lib/constants.js";

export const database = () => {
  mongoose
    .connect(String(uri).replace("<PASSWORD>", String(db_pass)))
    .then(() => {
      console.log(msg_api);
    })
    .catch((err) => console.log(err));
  mongoose.connection.on("error", (error) => {
    console.error("Error connecting to MongoDB:", error);
  });
};
