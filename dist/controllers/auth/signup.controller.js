"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_middleware_1 = require("@middlewares/async.middleware");
const user_model_1 = __importDefault(require("@models/user.model"));
const response_util_1 = require("@utils/response.util");
const signup = (0, async_middleware_1.asyncHandler)(async (req, res) => {
    const payload = req.body;
    const { email, name, password } = payload;
    const hasExist = await user_model_1.default.findOne({ email });
    if (hasExist) {
        return (0, response_util_1._response)(res, "user with email already exist", false, 400, {});
    }
    const data = {
        email,
        password,
        name,
    };
    await user_model_1.default.create(data);
    (0, response_util_1._response)(res, "User created successfully", true, 201, {});
});
exports.default = signup;
//# sourceMappingURL=signup.controller.js.map