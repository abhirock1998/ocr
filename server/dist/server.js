"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const db_service_1 = require("@services/db.service");
const index_1 = __importDefault(require("@routes/index"));
const path_1 = __importDefault(require("path"));
const error_middleware_1 = require("@middlewares/error.middleware");
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.configDotenv)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
const buildFolder = path_1.default.join(__dirname, "..", "..", "client", "dist");
app.use(express_1.default.static(buildFolder));
// Registering Index router
app.use("/api/v1/", index_1.default);
// Fallback route to serve index.html for any non-API routes
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(buildFolder, "index.html"));
});
// Error handling middleware
app.use(error_middleware_1.errorMiddleware);
app.listen(3000, async () => {
    await (0, db_service_1.connectToDB)();
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=server.js.map