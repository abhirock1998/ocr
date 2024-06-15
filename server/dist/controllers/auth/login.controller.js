"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_middleware_1 = require("@middlewares/async.middleware");
const user_model_1 = __importDefault(require("@models/user.model"));
const response_util_1 = require("@utils/response.util");
const sanitize_util_1 = require("@utils/sanitize.util");
const login = (0, async_middleware_1.asyncHandler)(async (req, res) => {
    const payload = req.body;
    console.log("Payload", payload);
    const { email, password } = payload;
    const hasExist = await user_model_1.default.findOne({ email }).select("+password");
    if (!hasExist) {
        return (0, response_util_1._response)(res, "User with this email not found", false, 404, {});
    }
    const pHash = hasExist.password;
    const isPasswordMatch = await hasExist.comparePassword(pHash, password);
    if (!isPasswordMatch) {
        return (0, response_util_1._response)(res, "Invalid password", false, 400, {});
    }
    const accessToken = hasExist.genAccessToken();
    const refreshToken = hasExist.genRefreshToken();
    const responsePayload = {
        accessToken,
        refreshToken,
        user: (0, sanitize_util_1.sanitizeUser)(hasExist),
    };
    hasExist.refresh_token = refreshToken;
    await hasExist.save();
    // saving user in session for future use
    req.session = hasExist;
    console.log("After login", req.session);
    (0, response_util_1._response)(res, "User logged in successfully", true, 200, responsePayload);
});
exports.default = login;
//# sourceMappingURL=login.controller.js.map