import path from "path";
import cors from "cors";
import express from "express";
import router from "@routes/index";
import { configDotenv } from "dotenv";
import { connectToDB } from "@services/db.service";
import { errorMiddleware } from "@middlewares/error.middleware";

configDotenv();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  console.log(`Time: ${new Date().toLocaleTimeString()}`);
  next();
});

const buildFolder = path.join(__dirname, "..", "..", "client", "dist");

console.log("buildFolder", buildFolder);
app.use(express.static(buildFolder));

// Registering Index router
app.use("/api/v1/", router);

app.get("*", (req, res) => {
  const reqURL = req.url;
  if (reqURL.startsWith("/assets/")) {
    const assetFile = path.resolve(buildFolder, reqURL.replace(/^\//, ""));
    res.sendFile(assetFile, (err) => {
      if (err) {
        console.error(`Error sending file ${assetFile}:`, err);
        res.status(404).end();
      }
    });
  } else {
    // For other non-API routes, serve index.html
    res.sendFile(path.resolve(buildFolder, "index.html"));
  }
});

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env["PORT"] || 3000;

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server is running on port ${PORT}`);
});
