import path from "path";
import cors from "cors";
import express from "express";
import router from "@routes/index";
import { configDotenv } from "dotenv";
import { connectToDB } from "@services/db.service";
import { errorMiddleware } from "@middlewares/error.middleware";

configDotenv();

const app = express();

const mimeTypes: Record<string, string> = {
  ".css": "text/css",
  ".js":
    "application/javascript, application/x-javascript, text/javascript, text/html",
  ".html": "text/html",
  ".png": "image/png",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".map": "application/json",
  ".json": "application/json",
  ".wasm": "application/wasm",
  ".txt": "text/plain",
};

app.use(express.json());
app.use(cors({ origin: "*" }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  console.log(`Time: ${new Date().toLocaleTimeString()}`);
  next();
});

// app.use((req, res, next) => {
//   if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
//     next();
//   } else {
//     res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
//     res.header("Expires", "-1");
//     res.header("Pragma", "no-cache");
//     res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
//   }
// });

const buildFolder = path.join(__dirname, "..", "..", "client", "dist");

console.log("Build Folder", buildFolder);

// Serve static files with correct MIME types
app.use(express.static(buildFolder));

// Registering Index router
app.use("/api/v1/", router);

// // Fallback route to serve index.html for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(buildFolder, "index.html"));
});

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env["PORT"] || 3000;

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server is running on port ${PORT}`);
});
