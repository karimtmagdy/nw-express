import { model, Schema, Types } from "mongoose";
const productSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "product must be have name"],
      unique: [true, "product must be unique"],
      minlength: [3, "product must be at least 3 characters"],
      maxlength: [100, "product must be less than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
      required: [true, "description is required"],
      minlength: [20, "description must be at least 20 characters"],
      maxlength: [1000, "description must be less than 1000 characters"],
    },
    price: {
      type: Number,
      trim: true,
      default: null,
      required: [true, "product price is required"],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "rating must be at least 0"],
      max: [5, "rating must be less than 5"],
    },
    stock: {
      type: Number,
      default: 0,
      required: [true, "product quantity is required"],
    },
    currency: {
      type: String,
      trim: true,
      required: [true, "currency is required"],
      minlength: [3, "currency must be at least 3 characters"],
      maxlength: [3, "currency must be less than 3 characters"],
      enum: ["EGP", "USD"],
    },
    // images: { type: Array, default: [] },
    discount: { type: Number, default: null },
    ratings_quntity: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    slug: { type: String, lowercase: true },
    unit: { type: String, default: null },
    publish: { type: Boolean, default: false },
    public: { type: Boolean, default: true },
    more_details: { type: Object, default: {} },
    colors: [String],
    sizes: [String],
    images: [String],

    cover: { type: String, trim: true },
    createdBy: { type: Types.ObjectId, ref: "User" },
    category: [{ type: Types.ObjectId, ref: "Category" }],
    subCategory: [{ type: Types.ObjectId, ref: "SubCategory" }],
    brand: [{ type: Types.ObjectId, ref: "Brand" }],
    reviews: [{ type: Types.ObjectId, ref: "Review" }],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { collection: "products" }
);

export default model("Product", productSchema);
productSchema.virtual("inStock").get(function () {
  return this.stock > 0 ? "in stock" : "out of stock";
});
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });
productSchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

// likes: { type: Number, default: 0 },
// comments: { type: Number, default: 0 },
// shares: { type: Number, default: 0 },
// favorite: {},
// wishlist: {},
// cart: {},
