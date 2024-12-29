import { Router } from "express";

import { upload } from "../middlewares/multerConfig.js";

const router = Router();

router.post("/", upload.single("image"), (req, res) => {
  return res.status(200).json({ message: "Upload successfully" });
});

export { router as uploadRoutes };
