"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUser = void 0;
const sanitizeUser = (user) => {
    let userObj = { ...user };
    const removeFields = ["password", "refresh_token"];
    removeFields.forEach((field) => {
        delete userObj[field];
    });
    return user;
};
exports.sanitizeUser = sanitizeUser;
//# sourceMappingURL=sanitize.util.js.map