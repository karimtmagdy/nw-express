import slugify from "slugify";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { fn, getPagination } from "../lib/utils.js";
// import { cache, generateCacheKey } from "../lib/utils.js";
// available

/**
 * @description create user
 * @method      POST
 * @route       /api/v1/users
 * @access      private
 */

export const createUser = fn(async (req, res) => {
  const { username, email, password, gender } = req.body;
  const user = await User.create({
    username,
    email,
    password,
    gender,
    slug: slugify(username),
  });
  if (!user) res.status(400).json({ message: "failed to create user" });
  const userObject = user.toObject();
  delete userObject.password;
  await user.save();
  res.status(201).json({ status: "success", user: userObject });
});

/**
 * @description all user
 * @method      GET
 * @route       /api/v1/users
 * @access      public
 */

export const getUsers = fn(async (req, res) => {
  const total = await User.countDocuments();
  const { limit, skip } = getPagination(total, req.query);
  const pages = Math.ceil(total / limit);
  // const casheKey = generateCacheKey("User", { page, limit });
  // const cachedData = cache.get(casheKey);
  // if (cachedData)  return res.json({ cachedData });
  const users = await User.find({})
    .skip(skip)
    .limit(limit)
    .lean()
    .select({ password: false });

  if (!users) res.status(500).json({ message: "failed to retrieve users" });
  if (users.length === 0)
    return res.status(404).json({ message: "No users found." });
  res.status(200).json({ results: total, pages, status: "success", users });
});

/**
 * @description Get user by id
 * @method      GET
 * @route       /api/v1/users/:id
 * @access      private
 */

export const getSingleUserById = fn(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id }).select("-password");
  if (!user)
    res.status(404).json({ status: "fail", message: "user not found" });
  res.status(200).json({ status: "success", user });
});

/**
 * @description Delete user by id
 * @method      DELETE
 * @route       /api/v1/users/:id
 * @access      private (only admin)
 * @memberof    Admin
 */

export const updateUser = fn(async (req, res) => {
  const { id } = req.params;
  const { username, password, gender, phone, photo, role, permissions } =
    req.body;
  const updates = {
    $set: {
      username,
      slug: username ? slugify(username, { lower: true }) : undefined,
      password,
      gender,
      phone,
      photo,
      role,
      permissions,
    },
  };
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(password, salt);
  }
  Object.keys(updates).forEach(
    (key) => updates[key] === undefined && delete updates[key]
  );
  const user = await User.findByIdAndUpdate(id, updates, { new: true });

  if (!user) {
    res.status(404).json({ status: "fail", message: "cannot found this user" });
  }
  const userObject = user.toObject();
  delete userObject.password;
  res.status(200).json({
    status: "success",
    user: userObject,
    messsage: "updated user successfully",
  });
});

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
