import path from "path";
import cors from "cors";
import express from "express";
import router from "@routes/index";
import { exec } from "child_process";
import { configDotenv } from "dotenv";
import { connectToDB } from "@services/db.service";
import { errorMiddleware } from "@middlewares/error.middleware";

configDotenv();

// Define MIME types for different file extensions
const mimeTypes: any = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".json": "application/json",
  ".wasm": "application/wasm",
};

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  console.log(`Time: ${new Date().toLocaleTimeString()}`);
  next();
});

const buildFolder = path.join(__dirname, "..", "..", "client", "build");
const clientFolder = path.join(__dirname, "..", "..", "client");

console.log("buildFolder", buildFolder);

// Registering Index router
app.use("/api/v1/", router);

// Serve app production bundle
app.use(express.static(buildFolder));

app.get("/", function (req, res) {
  console.log(`Serving index.html`);
  res.sendFile(path.join(buildFolder, "index.html"));
});

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env["PORT"] || 3000;

exec("npm run build", { cwd: clientFolder }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing build script: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout: ${stdout}`);

  app.listen(PORT, async () => {
    await connectToDB();
    console.log(`Server is running on port ${PORT}`);
  });
});
