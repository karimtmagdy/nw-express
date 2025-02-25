import { model, Schema, Types } from "mongoose";

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "sub category must be have name"],
      unique: [true, "sub category must be unique"],
      minlength: [2, "sub category must be at least 2 characters"],
      maxlength: [32, "sub category must be less than 32 characters"],
    },
    slug: { type: String, lowercase: true },
    image: { type: String },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: "sub category must have a creator",
    },
    category: [
      {
        type: Types.ObjectId,
        ref: "Category",
        required: [true, "sub category must have a category"],
      },
    ],
  },
  { timestamps: true, collection: "subcategories" }
);

export default model("SubCategory", subCategorySchema);
