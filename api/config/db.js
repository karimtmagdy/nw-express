import mongoose from "mongoose";

const Message = "Message : API is connected Successfully";
export const database = async () => {
  mongoose.connect(process.env.MONGO_URI);
  // process.env.DB_VERCEL.replace("<PASSWORD>", process.env.DB_PASSWORD)
  mongoose.connection.once("open", () => {
    console.log(Message);
  });
  mongoose.connection.on("error", (error) => {
    console.error("Error connecting to MongoDB:", error);
  });
};
