import { model, Schema } from "mongoose";
const paymentSchema = new Schema({}, { collection: "payment" });
export default model("Payment", paymentSchema);
