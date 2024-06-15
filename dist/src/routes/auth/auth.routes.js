"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_controller_1 = __importDefault(require("@controllers/auth/login.controller"));
const signup_controller_1 = __importDefault(require("@controllers/auth/signup.controller"));
const token_controller_1 = require("@controllers/auth/token.controller");
const validate_middleware_1 = require("@middlewares/validate.middleware");
const auth_schema_1 = require("@schemas/auth.schema");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/signup", (0, validate_middleware_1.validatePayload)(auth_schema_1.signupSchema), signup_controller_1.default);
router.post("/login", (0, validate_middleware_1.validatePayload)(auth_schema_1.loginSchema), login_controller_1.default);
router.post("/refresh-access-token", token_controller_1.refreshAccessToken);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map