import { model, Schema ,Types} from "mongoose";

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "sub category must be have name"],
      unique: [true, "sub category must be unique"],
      minlength: [3, "sub category must be at least 3 characters"],
      maxlength: [32, "sub category must be less than 32 characters"],
    },
    slug: { type: String, lowercase: true },
    category: {
      type:  Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const SubCategory = model("SubCategory", subCategorySchema);
export default SubCategory;
