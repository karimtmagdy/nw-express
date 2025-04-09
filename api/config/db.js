import mongoose from "mongoose";
export const msg_api = "Message: API is connected successfully";
export const database = () => {
  mongoose.set("strictQuery", true);
  // mongoose.set("strictQuery", false);
  if (!process.env.MONGO_URI)
    throw new Error("please provide url in the .env file");
  mongoose
    .connect(
      String(process.env.MONGO_URI).replace(
        "<PASSWORD>",
        String(process.env.DB_PASSWORD)
      )
    )
    .then(() => {
      console.log(msg_api);
    })
 
};
