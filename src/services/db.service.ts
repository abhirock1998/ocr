import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const MONGO_URI = process.env["MONGO_URI"];
    if (MONGO_URI) await mongoose.connect(MONGO_URI, { dbName: "ocr" });
    if (MONGO_URI) console.log("Connected to DB:", mongoose.connection.name);
  } catch (error: any) {
    console.error("Error connecting to DB: ", error.message);
    process.exit(1);
  }
};
