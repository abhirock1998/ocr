import login from "@controllers/auth/login.controller";
import signup from "@controllers/auth/signup.controller";
import { refreshAccessToken } from "@controllers/auth/token.controller";
import { validatePayload } from "@middlewares/validate.middleware";
import { loginSchema, signupSchema } from "@schemas/auth.schema";
import { Router } from "express";

const router = Router();

router.post("/signup", validatePayload(signupSchema), signup);
router.post("/login", validatePayload(loginSchema), login);
router.post("/refresh-access-token", refreshAccessToken);

export default router;
