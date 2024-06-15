import React from "react";

type PreviewProps = {
  file: File | null;
};

const Preview: React.FC<PreviewProps> = ({ file }) => {
  if (!file)
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-lg">No Image Selected</span>
      </div>
    );
  return (
    <div className="flex justify-center items-center h-full w-full">
      <img
        src={URL.createObjectURL(file)}
        alt="preview"
        className="h-full object-contain"
      />
    </div>
  );
};

export default Preview;
