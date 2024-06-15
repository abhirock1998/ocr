"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const imageModel = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    bold_text: { type: String },
    has_bold_text: { type: Boolean, default: false },
    ocr_text: { type: String },
    url: { type: String, required: true },
});
const ImageModel = mongoose_1.default.model("Image", imageModel);
exports.default = ImageModel;
//# sourceMappingURL=image.model.js.map