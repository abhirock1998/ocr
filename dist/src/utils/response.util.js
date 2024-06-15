"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._response = void 0;
const _response = (res, message, success, statusCode, data) => {
    if (success) {
        res.status(statusCode).json({ success, message, data });
    }
    else {
        let error = message;
        if (typeof message === "string") {
            error = [{ message }];
        }
        res.status(statusCode).json({
            success,
            message: "An error encountered",
            data: data ? data : {},
            error,
        });
    }
};
exports._response = _response;
//# sourceMappingURL=response.util.js.map