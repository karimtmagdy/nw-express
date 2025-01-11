import mongoose from "mongoose";
const Message = "Message : API is connected Successfully";

export const database = () => {
  mongoose
    .connect(
      String(process.env.MONGO_URI).replace(
        "<PASSWORD>",
        String(process.env.DB_PASSWORD)
      )
    )
    .then(() => {
      console.log(Message);
    })
    .catch((err) => console.log(err));

  mongoose.connection.on("error", (error) => {
    console.error("Error connecting to MongoDB:", error);
  });
};
