import { uploadFolder } from "@utils/file.util";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`File is:`, file);
    console.log("Upload folder:", uploadFolder);
    console.log("COOL:", fs.readdirSync(__dirname));
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    try {
      const fileName = `${Date.now()}-${file.originalname}`;
      console.log("Filename:", fileName);
      req.fileName = fileName;
      console.log("req.fileName:", req.fileName);
      cb(null, fileName);
    } catch (error: any) {
      console.log(`Error in filename:`, error.message);
      cb(error, "");
    }
  },
});

export const upload = multer({ storage });
