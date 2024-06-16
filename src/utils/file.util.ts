import path from "path";
import fs from "fs";

export const uploadFolder = path.join("..", "uploads");

export const getImagePath = (fileName: string) => `${uploadFolder}/${fileName}`;

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
