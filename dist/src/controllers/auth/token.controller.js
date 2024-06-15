"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = void 0;
const async_middleware_1 = require("@middlewares/async.middleware");
const user_model_1 = __importDefault(require("@models/user.model"));
const jwt_service_1 = require("@services/jwt.service");
const response_util_1 = require("@utils/response.util");
exports.refreshAccessToken = (0, async_middleware_1.asyncHandler)(async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return (0, response_util_1._response)(res, "Refresh token not found", false, 400, {});
    }
    try {
        (0, jwt_service_1.verifyToken)(refreshToken);
    }
    catch (error) {
        const message = error?.message || "Invalid token";
        if (message.includes("jwt expired")) {
            return (0, response_util_1._response)(res, "Refresh token expired", false, 403, {});
        }
    }
    const user = await user_model_1.default.findOne({ refresh_token: refreshToken });
    if (!user) {
        return (0, response_util_1._response)(res, "User not found", false, 404, {});
    }
    const accessToken = user.genAccessToken();
    const payload = {
        accessToken,
    };
    (0, response_util_1._response)(res, "Access token refreshed", true, 200, payload);
});
//# sourceMappingURL=token.controller.js.map