"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("@routes/auth/auth.routes"));
const image_routes_1 = __importDefault(require("@routes/image/image.routes"));
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default);
router.use("/image", image_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map