import { model, Schema, Types } from "mongoose";
// const formatDisplayname = (username) =>
  // `@${username.replace(/\s+/g, "." || "-")}`;
const userSchema = new Schema(
  {
    // nikename: {
    //   type: String,lowercase: true,trim: true,unique: true,
    //   set: function (nikename) {
    //     return nikename || formatDisplayname(this.username);
    //   },
    // },
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      minlength: [3, "username must be at least 3 characters"],
      maxlength: [32, "username must be less than 32 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email must be unique"],
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) =>
          /^([\w-]+(?:\.[\w-]+)*)@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v),
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password must be at least 6 characters"],
      trim: true,
    },

    slug: { type: String, lowercase: true },
    gender: { type: String, enum: ["male", "female"] },
    active: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    remember_me: { type: Boolean, default: false },
    phone: { type: Number, default: null },
    cart: [{ type: Types.ObjectId, ref: "cart" }],
    order: [{ type: Types.ObjectId, ref: "order" }],
    wishlist: [{ type: Types.ObjectId, ref: "wishlist" }],
    last_login: { type: Date, default: null},
    status: {
      type: String,
      enum: ["active", "inactive", "banned", "suspended"],
      default: "active",
    },
    photo: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
        publicId: null,
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    permissions: {
      type: [String],
      enum: [
        "users:create",
        "users:read",
        "users:update",
        "users:delete",
        "categories:create",
        "categories:read",
        "categories:update",
        "categories:delete",
        "subcategories:create",
        "subcategories:read",
        "subcategories:update",
        "subcategories:delete",
        "product:create",
        "product:read",
        "product:update",
        "product:delete",
        "dashboard:access",
        "settings:access",
        "reports:view",
        "roles:assign",
        "roles:update",
        "roles:delete",
        "orders:approve",
        "orders:cancel",
        "orders:refund",
        "payments:manage",
        "invoices:generate",
        "settings:update",
        "system:maintenance",
        "security:manage",
        "create",
        "read",
        "update",
        "delete",
        "all",
      ],
      default: ["read"],
    },
  },
  { collection: "users", timestamps: { createdAt: "joinedAt" } }
);
// userSchema.index({ email: 1 }, { unique: true });
// userSchema.pre("save", function (next) {
//   if (!this.nikename) {
//     this.nikename = formatDisplayname(this.username);
//   }
//   next();
// });
export default model("User", userSchema);
// bio: { type: String, trim: true },
// address: [{ type: Types.ObjectId, ref: "address" }],
// forgot_password: { type: String, default: null },
// forgot_password_expiry: { type: Date, default: "" },
