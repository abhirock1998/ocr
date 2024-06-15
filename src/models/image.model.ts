import mongoose from "mongoose";

const imageModel = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bold_text: { type: String },
  has_bold_text: { type: Boolean, default: false },
  ocr_text: { type: String },
  url: { type: String, required: true },
});

const ImageModel = mongoose.model("Image", imageModel);

export default ImageModel;
