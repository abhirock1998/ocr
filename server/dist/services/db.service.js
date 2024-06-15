"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDB = async () => {
    try {
        const MONGO_URI = process.env["MONGO_URI"];
        if (MONGO_URI)
            await mongoose_1.default.connect(MONGO_URI, { dbName: "ocr" });
        if (MONGO_URI)
            console.log("Connected to DB");
    }
    catch (error) {
        console.error("Error connecting to DB: ", error.message);
        process.exit(1);
    }
};
exports.connectToDB = connectToDB;
//# sourceMappingURL=db.service.js.map