import path from "path";
import fs from "fs";

// Path to the uploads folder
export const uploadFolder = path.join(__dirname, "..", "uploads");

export const getImagePath = (fileName: string) => `${uploadFolder}/${fileName}`;

// Deletes a file from the server
export const deleteFile = (fileName: string) => {
  const filePath = getImagePath(fileName);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Deleted file: ${filePath}`);
  });
};
