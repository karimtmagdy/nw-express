import { model, Schema, Types } from "mongoose";
const Status = ["active", "inactive", "banned", "suspended"];
const Roles = ["user", "admin"];
const Genders = ["male", "female"];
const Permission = [
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
];
const userSchema = new Schema(
  {
    nikename: { type: String, lowercase: true },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v) =>
          /^([\w-]+(?:\.[\w-]+)*)@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v),
        message: "Invalid email format",
      },
    },
    photo: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
        publicId: null,
      },
    },
    password: { type: String, trim: true, required: true, minlength: 6 },
    slug: { type: String, lowercase: true },
    phone: { type: Number, default: null },
    remember_me: { type: Boolean, default: false },
    gender: { type: String, enum: Genders },
    role: { type: String, enum: Roles, default: "user" },
    status: { type: String, enum: Status, default: "active" },
    active: { type: Boolean, default: true },
    verified: { type: Boolean, default: false },
    permissions: { type: [String], enum: Permission, default: ["read"] },
    last_login: { type: Date, default: null },
    cart: [{ type: Types.ObjectId, ref: "cart" }],
    order: [{ type: Types.ObjectId, ref: "order" }],
    wishlist: [{ type: Types.ObjectId, ref: "wishlist" }],
    likes: [{ type: Types.ObjectId, ref: "likes" }],
    favorite: [{ type: Types.ObjectId, ref: "favorite" }],
    reset_password_token: String,
    reset_password_expire_at: Date,
    forgot_password: String,
    forgot_password_expiry: Date,
    verification_token: String,
    verification_token_expire_at: Date,
    verify_otp: { type: String, default: "" },
    verify_otp_expire_at: { type: Number, default: 0 },
    reset_otp: { type: String, default: "" },
    reset_otp_expire_at: { type: Number, default: 0 },
  },
  { collection: "users", timestamps: { createdAt: "joinedAt" } }
);
// userSchema.index({ email: 1 }, { unique: true });
export default model("User", userSchema);
