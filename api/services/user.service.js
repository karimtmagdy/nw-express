import slugify from "slugify";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { fn, getPagination } from "../lib/utils.js";
import {
  delete_success,
  failed_create,
  fields_empty,
  not_available,
  update_success,
} from "../constants/constants.js";

/**
 * @description Create user
 * @method      POST
 * @route       /api/v1/users
 * @access      private
 */
export const createUser = fn(async (req, res) => {
  const { username, email, password, } = req.body;
  if (!username || !email || !password   )
    return res.status(400).json({ message: fields_empty });
  const existing = await User.exists({ email }).exec();
  if (existing) return res.status(409).json({ message: "user already exists" });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const userdata = {
    username,
    email,
    password: hashPassword,
   
    slug: slugify(username),
  };
  const user = await User.create(userdata);
  if (!user) res.status(400).json({ message: `${failed_create} user` });
  const userObject = user.toObject();
  delete userObject.joinedAt;
  delete userObject.updatedAt;
  delete userObject.password;
  await user.save();
  res.status(201).json({ status: "success", user: userObject });
});

/**
 * @description Get user
 * @method      GET
 * @route       /api/v1/users
 * @access      private
 */
export const getUsers = fn(async (req, res) => {
  const total = await User.countDocuments();
  const { page, limit, skip } = getPagination(total, req.query);
  const pages = Math.ceil(total / limit);
  const users = await User.find({})
    .skip(skip)
    .limit(limit)
    .lean()
    .select({ password: false });
  if (!users) return res.status(404).json({ message: "No users found." });
  const results = total;
  res.status(200).json({ results, pages, page, status: "success", users });
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
  if (!user) return res.status(404).json({ message: `user ${not_available}` });
  res.status(200).json({ status: "success", user });
});

/**
 * @description Update user by id
 * @method      PATCH
 * @route       /api/v1/users/:id
 * @access      private
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
  if (!user) return res.status(404).json({ message: `user ${not_available}` });
  const userObject = user.toObject();
  delete userObject.password;
  res.status(200).json({
    status: "success",
    user: userObject,
    messsage: `user ${update_success}`,
  });
});

/**
 * @description Delete user by id
 * @method      DELETE
 * @route       /api/v1/users/:id
 * @access      private
 */
export const deleteUser = fn(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete({ _id: id });
  if (!user) return res.status(404).json({ message: `user ${not_available}` });
  // clearCache("User", { id });
  res.status(200).json({
    status: "success",
    messsage: `user ${delete_success}`,
  });
});
