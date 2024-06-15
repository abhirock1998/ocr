import { extractContent } from "@controllers/image/ocr.controller";
import { protectRouter } from "@middlewares/protect.middleware";
import { upload } from "@middlewares/upload.middleware";
import { Router } from "express";

const router = Router();

router.post("/upload", protectRouter, upload.single("file"), extractContent);

export default router;
