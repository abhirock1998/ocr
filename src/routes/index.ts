import { Router } from "express";
import userRouter from "@routes/auth/auth.routes";
import imageRouter from "@routes/image/image.routes";

const router = Router();

router.use("/auth", userRouter);
router.use("/image", imageRouter);

export default router;
