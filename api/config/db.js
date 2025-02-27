import mongoose from "mongoose";
import { db_pass, uri } from "../constants/env.js";
import ApiError from "../lib/api.error.js";

export const msg_api = "Message: API is connected successfully";
// export const database = () => {
//   if (!uri) throw new Error("please provide url in the .env file");
//   mongoose
//     .connect(String(uri).replace("<PASSWORD>", String(db_pass)))
//     .then(() => {
//       console.log(msg_api);
//     })
//     .catch((err) => console.error("Error MongoDB: Catch", err));
//   mongoose.connection.on("error", (error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });
// };

if (!uri || !db_pass) {
  throw new ApiError(
    "Please provide the database URI and password in the .env file"
  );
}

export const database = async () => {
  try {
    const dbUri = uri.replace("<PASSWORD>", db_pass);
    await mongoose.connect(dbUri);
    console.log(msg_api);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // إنهاء التطبيق إذا فشل الاتصال
  }
};

// التعامل مع أخطاء الاتصال
mongoose.connection.on("error", (error) => {
  console.error("MongoDB Connection Error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected. Reconnecting...");
  connectDatabase();
});

// export default mongoose.connection;
