import { Types, model, Schema } from "mongoose";
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "category must be have a name"],
      unique: [true, "category must be have a unique name"],
      trim: true,
      minlength: [3, "category must be at least 3 characters"],
      maxlength: [32, "category must be less than 32 characters"],
    },
    image: { type: String },
    description: { type: String },
    slug: { type: String, lowercase: true },
    createdBy: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: true, collection: "categories" }
);
export default model("Category", categorySchema);
