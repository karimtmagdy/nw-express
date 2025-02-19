import { model, Schema } from "mongoose";
const addressSchema = new Schema(
  {
    address_line: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    pin_code: { type: String },
    cuntery: { type: String },
    mobile: { type: Number, default: null },
    status: { type: Boolean, default: true },
  },
  { collection: "address" }
);
export default model("Address", addressSchema);
