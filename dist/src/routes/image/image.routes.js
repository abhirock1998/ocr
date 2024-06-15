"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ocr_controller_1 = require("@controllers/image/ocr.controller");
const protect_middleware_1 = require("@middlewares/protect.middleware");
const upload_middleware_1 = require("@middlewares/upload.middleware");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/upload", protect_middleware_1.protectRouter, upload_middleware_1.upload.single("file"), ocr_controller_1.extractContent);
exports.default = router;
//# sourceMappingURL=image.routes.js.map