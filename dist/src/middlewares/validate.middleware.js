"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePayload = void 0;
const validatePayload = (schema) => {
    return async (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            res.status(400).json({ message: error.errors });
        }
    };
};
exports.validatePayload = validatePayload;
//# sourceMappingURL=validate.middleware.js.map