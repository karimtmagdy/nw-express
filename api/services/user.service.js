import slugify from "slugify";
import User from "../models/user.model.js";
import { fn } from "../lib/utils.js";
// import { cache, generateCacheKey } from "../lib/utils.js";

/**
 * @description create user
 * @method      POST
 * @route       /api/v1/admin/users
 * @access      private
 * @memberof    Admin
 */

export const createUser = fn(async (req, res) => {
  const { username, email, password, role, gender } = req.body;
  const user = await User.create({
    username,
    email,
    password,
    role,
    gender,
    slug: slugify(username),
  });
  if (!user) {
    res.status(400).json({ message: "failed to create user" });
  }
  const userObject = user.toObject();
  delete userObject.password;
  await user.save();
  res.status(201).json({
    status: "success",
    user: userObject,
    messsage: "user created successfully",
  });
});

/**
 * @description all user
 * @method      GET
 * @route       /api/v1/admin/users
 * @access      public
 * @memberof    Admin & User
 */
export const getUsers = fn(async (req, res) => {
  const page = parseInt(req.query.page) * 1 || 1;
  const limit = parseInt(req.query.limit) * 1 || 100;
  const skip = (page - 1) * limit;
  const total = await User.countDocuments();
  // const casheKey = generateCacheKey("User", { page, limit });
  // const cachedData = cache.get(casheKey);
  // if (cachedData)  return res.json({ cachedData });

  const users = await User.find().lean(); //.skip(skip).limit(limit)
  if (!users) {
    res.status(500).json({ message: "failed to retrieve users" });
  }
  if (users.length === 0) {
    return res.status(404).json({ message: "No users found." });
  }
  // const userObject = users.toObject();
  // delete userObject.password;
  res.status(200).json({ results: total, status: "success", users });
});

/**
 * @description Get user by id
 * @method      GET
 * @route       /api/v1/admin/users/:id
 * @access      private
 * @memberof    Admin
 */

export const singleUser = fn(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });
  if (!user) {
    res.status(404).json({ status: "fail", message: "user not found" });
  }
  res.status(200).json({ status: "success", user });
});

/**
 * @description update user by id
 * @method      PATCH
 * @route       /api/v1/admin/users/:id
 * @access      private (only admin)
 * @memberof    Admin
 */

export const updateUser = fn(async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: id },
    { username, slug: slugify(username) },
    req.body,
    { new: true }
  );
  if (!user) {
    res.status(404).json({ status: "fail", message: "cannot found this user" });
  }
  res.status(200).json({
    status: "success",
    user,
    messsage: "updated user successfully",
  });
});

/**
 * @description Delete user by id
 * @method      DELETE
 * @route       /api/v1/admin/users/:id
 * @access      private (only admin)
 * @memberof    Admin
 */

export const deleteUser = fn(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete({ _id: id });
  if (!user) {
    res.status(404).json({ status: "fail", message: "cannot found this user" });
  }
  res.status(200).json({
    status: "success",
    messsage: "deleted user successfully",
  });
});
