import { model, Schema, Types } from "mongoose";
const orderSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["completed", "cancel"], default: "active" },
    orderId: { type: String, required: [true, ""], unique: true },
    productId: { type: Types.ObjectId, ref: "Product" },
    product_details: { type: Object, name: String, _id: String, images: Array },
    paymentId: { type: String, default: "" },
    payment_status: { type: String, default: "" },
    delivery_address: { type: Types.ObjectId, ref: "Address" },
    subTotalAmt: { type: Number, default: "" },
    invoice_receipt: { type: String, default: "" },
  },
  { collection: "order" }
);
export default model("Order", orderSchema);
