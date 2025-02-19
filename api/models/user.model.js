import { model, Schema, Types } from "mongoose";
// const formatDisplayname = (username) =>
//   `@${username.replace(/\s+/g, "." || "-")}`;
const userSchema = new Schema(
  {
    // nikename: {
    //   type: String,
    //   trim: true,
    //   unique: true,
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
      unique: true,
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
      minlength: 6,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "inActive", "suspended"],
      default: "active",
    },
    photo: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
        publicId: null,
      },
    },
    permissions: {
      type: [String],
      enum: ["all", "create", "delete", "update", "view"],
      default: "view",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    gender: { type: String, enum: ["male", "female"] },
    bio: { type: String, trim: true },
    slug: { type: String, lowercase: true },
    phone: { type: Number, default: null },
    isAccountVerified: { type: Boolean, default: false },
    remember_me: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    address: [{ type: Types.ObjectId, ref: "address" }],
    cart: [{ type: Types.ObjectId, ref: "cart" }],
    order: [{ type: Types.ObjectId, ref: "order" }],
    last_login: { type: Date, default: Date.now },
    forgot_password: { type: String, default: null },
    forgot_password_expiry: { type: Date, default: "" },
  },
  {
    minimize: false,
    timestamps: { createdAt: "joinedAt" },
    versionKey: false,
    safe: true,
    collection: "users",
  }
);
// userSchema.pre("save", function (next) {
//   if (!this.nikename) {
//     this.nikename = formatDisplayname(this.username);
//   }
//   next();
// });
export default model("User", userSchema);
