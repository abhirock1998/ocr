"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractContent = void 0;
const async_middleware_1 = require("@middlewares/async.middleware");
const image_model_1 = __importDefault(require("@models/image.model"));
const file_util_1 = require("@utils/file.util");
const response_util_1 = require("@utils/response.util");
const fs_1 = __importDefault(require("fs"));
const tesseract_js_1 = require("tesseract.js");
exports.extractContent = (0, async_middleware_1.asyncHandler)(async (req, res) => {
    const { fileName, session: user } = req;
    if (!fileName) {
        return (0, response_util_1._response)(res, "File not found", false, 404, {});
    }
    const filepath = (0, file_util_1.getImagePath)(fileName);
    const extension = fileName.split(".").pop();
    const worker = await (0, tesseract_js_1.createWorker)();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data: { text, lines }, } = await worker.recognize(filepath);
    await worker.terminate();
    const imageURL = fs_1.default.readFileSync(filepath, { encoding: "base64" });
    (0, file_util_1.deleteFile)(fileName);
    const parseLines = lines.map((line) => {
        return {
            text: line.text,
            confidence: line.confidence.toFixed(2),
            highConfidence: line.confidence > 80,
            moderateConfidence: line.confidence > 50 && line.confidence <= 80,
            lowConfidence: line.confidence <= 50,
            words: line.words.map((word) => ({
                text: word.text,
                isBold: word.is_bold || false,
                confidence: word.confidence.toFixed(2),
                highConfidence: word.confidence > 80,
                moderateConfidence: word.confidence > 50 && word.confidence <= 80,
                lowConfidence: word.confidence <= 50,
            })),
        };
    });
    const boldWords = [];
    for (const line of parseLines) {
        for (const word of line.words) {
            if (word.isBold)
                boldWords.push(word);
        }
    }
    console.log("parseLines", parseLines);
    console.log("Bold Words", boldWords);
    const boldText = boldWords.map((word) => word.text).join(" ");
    await image_model_1.default.create({
        user: user?.user_id,
        has_bold_text: boldWords.length > 0,
        ocr_text: text,
        bold_text: boldText,
        url: `data:image/${extension || "png"};base64,${imageURL}`,
    });
    const payload = {
        text: text,
        lines: parseLines,
    };
    (0, response_util_1._response)(res, "Successfully extracted content", true, 200, payload);
});
//# sourceMappingURL=ocr.controller.js.map