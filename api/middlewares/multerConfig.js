import multer from "multer";
import { nanoid } from 'nanoid'
import uploadDir from "../config/static-file.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uuid = nanoid(10);
    const timestamp = new Date().toISOString().replace(/:/g, "-");
    const uniqueFilename = `${uuid}-${timestamp}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
