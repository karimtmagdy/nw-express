import { fn } from "../lib/utils.js";
import slugify from "slugify";
/**
 * @description create one
 * @methods     POST
 * @routes      /api/v1/nameroute
 * @access      private
 */
export const create = fn(async (req, res) => {
  const {} = req.body;
  res
    .status(200)
    .json({ status: "success", messsage: "name created successfully" });
});
/**
 * @description get all
 * @methods     GET
 * @routes      /api/v1/nameroute
 * @access      public
 */
export const get = fn(async (req, res) => {
  const page = parseInt(req.query.page) * 1 || 1;
  const limit = parseInt(req.query.limit) * 1 || 100;
  const skip = (page - 1) * limit;
  res.status(200).json({ status: "success", messsage: "" });
});
/**
 * @description get one
 * @methods     GET
 * @routes      /api/v1/nameroute/:id
 * @access      private
 */
export const single = fn(async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ status: "success", messsage: "" });
});
/**
 * @description update one by id
 * @methods     PATCH
 * @routes      /api/v1/nameroute/:id
 * @access      private
 */
export const update = fn(async (req, res) => {
  const { id } = req.params;
  res
    .status(200)
    .json({ status: "success", messsage: "updated name successfully" });
});
/**
 * @description delete one by id
 * @methods     DELETE
 * @routes      /api/v1/nameroute/:id
 * @access      private
 */
export const deleted = fn(async (req, res) => {
  const { id } = req.params;
  res
    .status(200)
    .json({ status: "success", messsage: "deleted name successfully" });
});
