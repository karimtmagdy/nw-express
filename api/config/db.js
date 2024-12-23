// process.env.DB_VERCEL.replace("<PASSWORD>", process.env.DB_PASSWORD)
import mongoose from "mongoose";
const Message = "Message : API is connected Successfully";

export const database = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(Message);
    })
    .catch((err) => console.log(err));

  mongoose.connection.on("error", (error) => {
    console.error("Error connecting to MongoDB:", error);
  });
};

// export const database =  () => {
//   mongoose.connect(process.env.MONGO_URI);
//   mongoose.connection.once("open", () => {
//     console.log(Message);
//   });
//   mongoose.connection.on("error", (error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });
// };
