"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (data, expiresIn) => {
    const jwt_token = process.env["JWT_SECRET"];
    if (!jwt_token) {
        throw new Error("JWT_SECRET is not defined and access token cannot be generated");
    }
    return jsonwebtoken_1.default.sign(data, jwt_token, { expiresIn: expiresIn });
};
exports.createToken = createToken;
const verifyToken = (token) => {
    const jwt_token = process.env["JWT_SECRET"];
    if (!jwt_token) {
        throw new Error("JWT_SECRET is not defined and access token cannot be verified");
    }
    return jsonwebtoken_1.default.verify(token, jwt_token);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.service.js.map