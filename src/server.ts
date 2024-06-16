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

const buildFolder = path.join("client", "dist");

console.log("Build Folder", buildFolder);

// Serve static files with correct MIME types
app.use(
  express.static(buildFolder, {
    setHeaders: (res, filePath) => {
      const ext = path.extname(filePath);
      const mimeType = mimeTypes[ext];
      console.log("mimeType", mimeType);
      res.setHeader("Content-Type", mimeType);
    },
  })
);

// Registering Index router
app.use("/api/v1/", router);

// Fallback route to serve index.html for any non-API routes
app.get("*", (req, res) => {
  // const indexFile = path.resolve(buildFolder, "index.html");
  // console.log(`indexFile`, indexFile);
  // const ext = path.extname(indexFile);
  // const mimeType = mimeTypes[ext];
  // res.setHeader("Content-Type", mimeType);
  // console.log("Sending index file", indexFile, mimeType);
  // res.sendFile(indexFile);
  if (
    !req.originalUrl.startsWith("/api/") &&
    !req.originalUrl.startsWith("/assets/")
  ) {
    const indexFile = path.resolve(buildFolder, "index.html");
    console.log(`indexFile`, indexFile);
    res.status(200).sendFile(indexFile);
  } else {
    const assetFile = path.resolve(buildFolder, req.url);
    res.status(200).sendFile(assetFile);
  }
});

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env["PORT"] || 3000;

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server is running on port ${PORT}`);
});
