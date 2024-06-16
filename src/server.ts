import path from "path";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import router from "@routes/index";
import { configDotenv } from "dotenv";
import { connectToDB } from "@services/db.service";
import { errorMiddleware } from "@middlewares/error.middleware";

configDotenv();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  console.log(`Time: ${new Date().toLocaleTimeString()}`);
  next();
});

const buildFolder = path.join("client", "dist");

console.log("Build Folder", buildFolder);

app.use(express.static(buildFolder));

// Registering Index router
app.use("/api/v1/", router);

// Fallback route to serve index.html for any non-API routes
app.get("*", (req, res) => {
  const indexFile = path.resolve(buildFolder, "index.html");
  console.log(`indexFile`, indexFile);
  res.sendFile(indexFile);
});

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env["PORT"] || 3000;
app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server is running on port ${PORT}`);
});
