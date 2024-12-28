import { Schema, model, Types } from "mongoose";
const ExelSchema = new Schema(
  {
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    brand: {
      type: Types.ObjectId,
      ref: "Brand",
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);
export default model("Exel", ExelSchema);
