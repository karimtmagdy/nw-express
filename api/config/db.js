import mongoose from "mongoose";
import { db_pass, uri } from "../constants/env.js";
import ApiError from "../lib/api.error.js";
export const msg_api = "Message : API is connected Successfully";
export const database = () => {
  if (!uri) throw new ApiError("please provide url in the .env file");
  mongoose
    .connect(String(uri).replace("<PASSWORD>", String(db_pass)))
    .then(() => {
      console.log(msg_api);
    })
    .catch((err) => console.error("Error MongoDB: Catch", err));
  mongoose.connection.on("error", (error) => {
    console.error("Error connecting to MongoDB:", error);
  });
  // .finally(() => { mongoose.connection.close() });
};
