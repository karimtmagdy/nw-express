import { Types, model, Schema } from "mongoose";
const productSchema = new Schema(
  {
    title: {
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
      required: [true, "description is required"],
      minlength: [20, "description must be at least 20 characters"],
      maxlength: [1000, "description must be less than 1000 characters"],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "product price is required"],
      // min: [10, "product price must be at least 10 characters"],
      // max: [200000, "product price must be less than 10 characters"],
    },
    discount: { type: Number },
    stock: { type: Number, required: [true, "product quantity is required"] },
    sold: { type: Number, default: 0 },
    slug: { type: String, lowercase: true },
    colors: [String],
    sizes: [String],
    images: [String],
    cover: { type: String, default:'https://images.unsplash.com/photo-1709528922659-8f86b0f02b9b?q=80&w=1852&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    about: {
      model: {
        type: String,
        trim: true,
        slug_model: { type: String, lowercase: true },
      },
      slug_model: { type: String, lowercase: true },
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "rating must be at least 0"],
      max: [5, "rating must be less than 5"],
    },
    ratings_quntity: {
      type: Number,
      default: 0,
    },
    createdBy: {
      ref: "User",
      type: Types.ObjectId,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: [true, "category is required"],
    },
    brand: {
      type: Types.ObjectId,
      ref: "Brand",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    reviews: [
      {
        type: Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
    collation: { locale: "en", strength: 2 },
    collection: "products",
  }
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
// views: { type: Number, default: 0 },
// likes: { type: Number, default: 0 },
// comments: { type: Number, default: 0 },
// shares: { type: Number, default: 0 },
// favorite: {},
// wishlist: {},
// cart: {},
