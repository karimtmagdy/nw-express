import { Types } from "mongoose";

export const validID = async (req, res, next) => {
  if (Types.ObjectId.isValid(req.params.id)) {
    next();
  } else {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }
};
