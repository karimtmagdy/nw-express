import { model, Schema, Types } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "brand must be have name"],
      unique: [true, "brand must be unique"],
      minlength: [3, "brand must be at least 3 characters"],
      maxlength: [32, "brand must be less than 32 characters"],
    },
    slug: { type: String, lowercase: true },
    image: { type: String }, 
    category: { type: Types.ObjectId, ref: "Category" },
    subCategory: { type: Types.ObjectId, ref: "SubCategory" },
  },
  { timestamps: true, collection: "brands" }
);

export default model("Brand", brandSchema);
