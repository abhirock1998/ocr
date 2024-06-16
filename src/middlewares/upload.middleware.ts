import { uploadFolder } from "@utils/file.util";
import multer from "multer";

/**
 * Multer disk storage configuration.
 * Defines the destination and filename for uploaded files.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`File is:`, file);
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    req.fileName = fileName;
    cb(null, fileName);
  },
});

/**
 * Multer upload middleware.
 * Uploads files to the server.
 */
export const upload = multer({ storage });
