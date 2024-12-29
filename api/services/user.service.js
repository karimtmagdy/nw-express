import User from "../models/user.model.js";
import { cache, fn, generateCacheKey } from "../lib/utils.js";
import slugify from "slugify";
import uploadDir from "../config/static-file.js";
import { cloudinaryUploadImage } from "../config/cloudinary.js";
/**
 * @description Create user
 * @method      POST
 * @route       /api/v1/users
 * @access      private
 * @memberof    Admin
 */
export const profilePhotoUpload = fn(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "failed to upload profile photo." });
  }
  const image_path = path.join(`${uploadDir}/${req.user._id}`);
  const { path } = req.file;
  const result = await cloudinaryUploadImage(path, image_path);
  console.log(result);
  if (!result) {
    return res.status(400).json({ message: "failed to upload profile photo." });
  }
  res.status(200).json({
    status: "success",
    message: "profile photo uploaded successfully.",
    result,
  });
});
export const createUser = fn(async (req, res) => {
  const { username } = req.body;
  const user = await User.create(req.body, {
    slug: slugify(username),
  });
  if (!user) {
    res.status(400).json({ message: "failed to create user." });
  }
  const userObject = user.toObject();
  delete userObject.password;
  res.status(201).json({
    status: "success",
    user: userObject,
    messsage: "User created successfully.",
  });
});

/**
 * @description Get all users
 * @method      GET
 * @route       /api/v1/users
 * @access      private
 * @memberof    Admin
 */

export const getUsers = fn(async (req, res) => {
  const total = await User.countDocuments();
  // const total = await User.countDocuments();
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) * 1 || 10;
  const skip = parseInt(page - 1) * limit;
  // const users = await User.find({}, "username email", { limit: 1 })
  const users = await User.find({})
    .skip(skip)
    .limit(limit)
    .lean()
    .select("-password -remember_me");
  // .select('-password -resetPasswordToken -resetPasswordExpire');
  // .populate({path:'-password'});
  const cacheKey = generateCacheKey("User", { page, limit });
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.json({ cachedData });
  }
  if (users.length === 0) {
    return res.status(404).json({ message: "No users found." });
  }
  if (!users) {
    res.status(500).json({ message: "failed to retrieve users." });
  }
  res
    .status(200)
    .json({ status: "success", results: total, page, limit, users });
});

/**
 * @description Get user by id
 * @method      GET
 * @route       /api/v1/users/:id
 * @access      private
 * @memberof    Admin
 */

export const singleUser = fn(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json({ status: "fail", message: `User ${id} not found.` });
  }
  res.status(200).json({ status: "fail", user });
});

/**
 * @description update user by id
 * @method      PATCH
 * @route       /api/v1/users/:id
 * @access      private (only admin)
 * @memberof    Admin
 */

export const updateUser = fn(async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  const user = await User.findByIdAndUpdate(
    { _id: id },
    req.body,
    { slug: slugify(username) },
    { new: true }
  );
  if (!user) {
    res.status(400).json({
      status: "fail",
      message: "User not found for update.",
    });
  }
  res
    .status(200)
    .json({ status: "success", messsage: "user updated successfully.", user });
});

/**
 * @description Delete user by id
 * @method      DELETE
 * @route       /api/v1/users/:id
 * @access      private (only admin)
 * @memberof    Admin
 */

export const deleteUser = fn(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    res
      .status(404)
      .json({ status: "fail", message: "user not found for deletion." });
  }
  res.status(204).json({
    status: "sucess",
    messsage: "User deleted successfully.",
    user,
  });
});

export const getProfile = fn(async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id).select("-password");
  if (!user) {
    res.status(404).json({ status: "fail", message: "user not found." });
  }
  res.status(200).json({ status: "success", user });
});
