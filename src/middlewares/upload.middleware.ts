import { uploadFolder } from "@utils/file.util";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`File is:`, file);
    console.log("Upload folder:", uploadFolder);
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}`;
    console.log("Filename:", fileName);
    req.fileName = fileName;
    cb(null, fileName);
  },
});

export const upload = multer({ storage });
