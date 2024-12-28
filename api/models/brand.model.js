import { model, Schema } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "brand must be have name"],
      unique: [true, "brand must be unique"],
      minlength: [3, "brand must be at least 3 characters"],
      maxlength: [32, "brand must be less than 32 characters"],
    },
    slug: { type: String, lowercase: true },
    image: { type: String }, // URL or file path
    category:{
      ref: "Category",
      type: Schema.Types.ObjectId
    },
  },
  { timestamps: true }
);

export const Brand = model("Brand", brandSchema);
