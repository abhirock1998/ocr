"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = async (req, res) => {
    console.log("Error Middleware");
    console.log(req.url, req.body);
    res.status(404).json({ message: "Not Found" });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map