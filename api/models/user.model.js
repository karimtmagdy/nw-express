import { model, Schema, Types } from "mongoose";
const Status = ["active", "inactive", "banned", "suspended"];
const Roles = ["user", "admin" , "manager" , "moderator" , "editor"  , "guest"];
 
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
      required: [true, "username is required"],
      trim: true,
      minlength: [3, "username must be at least 3 characters"],
      maxlength: [32, "username must be less than 32 characters"],
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
    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
      minlength: [6, "password must be at least 6 characters"],
    },
    photo: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
        publicId: null,
      },
    },

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
    resetPasswordToken: String,
    resetPasswordExpireAt: Date,
    forgotPassword: String,
    forgotPasswordExpiry: Date,
    verificationToken: String,
    verificationTokenExpireAt: Date,
    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Number, default: 0 },
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 },
    refreshToken: String,
  },
  { collection: "users", timestamps: { createdAt: "joinedAt" } }
);
// userSchema.index({ email: 1 }, { unique: true });
export default model("User", userSchema);
