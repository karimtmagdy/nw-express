import { model, Schema } from "mongoose";
const cartSchema = new Schema(
  {
    productId: { type: Types.ObjectId, ref: "Product" },
    userId: { type: Types.ObjectId, ref: "User" },
    quantity: { type: Number, default: 1 },
  },
  { collection: "cart" }
);
export default model("Cart", cartSchema);
