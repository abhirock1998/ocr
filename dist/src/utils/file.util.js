"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.getImagePath = exports.uploadFolder = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.uploadFolder = path_1.default.join(__dirname, "../uploads");
const getImagePath = (fileName) => `${exports.uploadFolder}/${fileName}`;
exports.getImagePath = getImagePath;
const deleteFile = (fileName) => {
    const filePath = (0, exports.getImagePath)(fileName);
    fs_1.default.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Deleted file: ${filePath}`);
    });
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=file.util.js.map