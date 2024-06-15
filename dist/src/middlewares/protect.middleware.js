"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRouter = void 0;
const jwt_service_1 = require("@services/jwt.service");
const async_middleware_1 = require("./async.middleware");
const response_util_1 = require("@utils/response.util");
exports.protectRouter = (0, async_middleware_1.asyncHandler)(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        const message = "Authorization not found in headers";
        (0, response_util_1._response)(res, message, false, 404, {});
    }
    try {
        (0, jwt_service_1.verifyToken)(token);
        next();
    }
    catch (error) {
        console.log("Error in protectRouter", error?.message);
        const message = error?.message || "Invalid token";
        if (message.includes("jwt expired")) {
            return (0, response_util_1._response)(res, "Access token expired", false, 401, {});
        }
        else {
            return (0, response_util_1._response)(res, message, false, 403, {});
        }
    }
});
//# sourceMappingURL=protect.middleware.js.map