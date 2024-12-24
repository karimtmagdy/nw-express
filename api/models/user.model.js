import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const formatDisplayname = (username) =>
  `@${username.replace(/\s+/g, "." || "-")}`;
const userSchema = new Schema(
  {
    display_name: {
      type: String,
      set: function (display_name) {
        return display_name || formatDisplayname(this.username);
      },
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "username is required"],
      minlength: [3, "username must be at least 3 characters"],
      maxlength: [32, "username must be less than 32 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) =>
          /^([\w-]+(?:\.[\w-]+)*)@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v),
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password must be at least 6 characters"],
      // maxlength: [32, "password must be less than 32 characters"],
    },
    // confirm_password: {
    //   type: String,
    // },
    role: {
      type: String,
      enum: ["user", "admin", "manager", "super-admin", "moderator"],
      default: "user",
    },
    slug: { type: String, lowercase: true },
    gender: { type: String, enum: ["male", "female"] },
    remember_me: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    photo_avatar: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        pablic_id: uuidv4().split("-")[0],
      },
    },
    about: {
      type: Object,
      default: {
        address: { type: String },
        mobile: { type: String },
        birthday: { type: Number },
        location: { type: String },
      },
    },
    joinedAt: { type: Date, default: Date.now },
    // is_deleted: { type: Boolean, default: false },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
    // createdBy: { type: ObjectId, ref: "User" },
    // updatedBy: { type: ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
    collection: "users",
  }
);
// SCHEMA MIDDLEWARE
userSchema.pre("save", function (next) {
  if (!this.display_name) {
    this.display_name = formatDisplayname(this.username);
  }
  next();
});
userSchema.pre("save", async function (next) {
  // if (this.password.length > 32) {
  //   const error = new Error("Password must be less than 32 characters.");
  //   return next(error);
  // }

  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default model("User", userSchema);
