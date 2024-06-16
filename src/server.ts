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

// Registering Index router
app.use("/api/v1/", router);

app.get("/", function (req, res) {
  console.log(`Serving index.html`);
  res.sendFile(path.resolve(buildFolder, "index.html"));
});

app.use("*", express.static(buildFolder));

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env["PORT"] || 3000;

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server is running on port ${PORT}`);
});
