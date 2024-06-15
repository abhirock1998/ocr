"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const file_util_1 = require("@utils/file.util");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        console.log(`File is:`, file);
        cb(null, file_util_1.uploadFolder);
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        console.log("Filename:", fileName);
        req.fileName = fileName;
        cb(null, fileName);
    },
});
exports.upload = (0, multer_1.default)({ storage });
//# sourceMappingURL=upload.middleware.js.map