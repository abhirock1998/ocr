"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = exports.loginSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const signupSchema = zod_1.default.object({
    email: zod_1.default.string().email("Invalid email format"),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().min(3),
});
exports.signupSchema = signupSchema;
const loginSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.loginSchema = loginSchema;
//# sourceMappingURL=auth.schema.js.map