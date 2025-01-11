import { model, Schema, set, Types } from "mongoose";
// const formatDisplayname = (username) =>
//   `@${username.replace(/\s+/g, "." || "-")}`;
const userSchema = new Schema(
  {
    // display_name: {
    //   type: String,
    //   trim: true,
    //   unique: true,
    //   set: function (display_name) {
    //     return display_name || formatDisplayname(this.username);
    //   },
    // },
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
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
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
    slug: {
      type: String,
      lowercase: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    bio: {
      type: String,
      trim: true,
    },
    phone_number: {
      type: String,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
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
//   if (!this.display_name) {
//     this.display_name = formatDisplayname(this.username);
//   }
//   next();
// });
export default model("User", userSchema);
