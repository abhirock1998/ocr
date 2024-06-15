import { asyncHandler } from "@middlewares/async.middleware";
import ImageModel from "@models/image.model";
import { deleteFile, getImagePath } from "@utils/file.util";
import { _response } from "@utils/response.util";
import { Request, Response } from "express";
import fs from "fs";
import { createWorker } from "tesseract.js";

export const extractContent = asyncHandler(
  async (req: Request, res: Response) => {
    const { fileName, session: user } = req;

    if (!fileName) {
      return _response(res, "File not found", false, 404, {});
    }

    const filepath = getImagePath(fileName);
    const extension = fileName.split(".").pop();
    const worker = await createWorker();

    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    const {
      data: { text, lines },
    } = await worker.recognize(filepath);

    await worker.terminate();

    const imageURL = fs.readFileSync(filepath, { encoding: "base64" });
    deleteFile(fileName);

    const parseLines = lines.map((line) => {
      return {
        text: line.text,
        confidence: line.confidence.toFixed(2),
        highConfidence: line.confidence > 80,
        moderateConfidence: line.confidence > 50 && line.confidence <= 80,
        lowConfidence: line.confidence <= 50,
        words: line.words.map((word) => ({
          text: word.text,
          isBold: word.is_bold || false,
          confidence: word.confidence.toFixed(2),
          highConfidence: word.confidence > 80,
          moderateConfidence: word.confidence > 50 && word.confidence <= 80,
          lowConfidence: word.confidence <= 50,
        })),
      };
    });

    const boldWords: any[] = [];

    for (const line of parseLines) {
      for (const word of line.words) {
        if (word.isBold) boldWords.push(word);
      }
    }

    console.log("parseLines", parseLines);
    console.log("Bold Words", boldWords);

    const boldText = boldWords.map((word) => word.text).join(" ");

    await ImageModel.create({
      user: user?.user_id,
      has_bold_text: boldWords.length > 0,
      ocr_text: text,
      bold_text: boldText,
      url: `data:image/${extension || "png"};base64,${imageURL}`,
    });

    const payload = {
      text: text,
      lines: parseLines,
    };

    _response(res, "Successfully extracted content", true, 200, payload);
  }
);
