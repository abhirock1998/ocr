import express from "express";
import { configDotenv } from "dotenv";
import { connectToDB } from "@services/db.service";
import router from "@routes/index";
import path from "path";
import { errorMiddleware } from "@middlewares/error.middleware";
import cors from "cors";

configDotenv();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

const buildFolder = path.join("client", "dist");
app.use(express.static(buildFolder));

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  console.log(`Time: ${new Date()}`);
  next();
});

// Registering Index router
app.use("/api/v1/", router);

// Fallback route to serve index.html for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(buildFolder, "index.html"));
});

// Error handling middleware
app.use(errorMiddleware);

app.listen(3000, async () => {
  await connectToDB();
  console.log("Server is running on port 3000");
});
