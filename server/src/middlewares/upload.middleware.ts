import { uploadFolder } from "@utils/file.util";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`File is:`, file);
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    console.log("Filename:", fileName);
    req.fileName = fileName;
    cb(null, fileName);
  },
});

export const upload = multer({ storage });
