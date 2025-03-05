import { model, Schema } from "mongoose";
const paymentSchema = new Schema(
  {},
  { timestamps: true, collection: "payments" }
);
export default model("Payment", paymentSchema);
