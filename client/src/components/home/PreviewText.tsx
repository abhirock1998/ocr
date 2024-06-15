import React from "react";

type Word = {
  text: string;
  isBold: boolean;
  confidence: number;
  highConfidence: boolean;
  moderateConfidence: boolean;
  lowConfidence: boolean;
};

type Line = {
  text: string;
  confidence: number;
  highConfidence: boolean;
  moderateConfidence: boolean;
  lowConfidence: boolean;
  words: Word[];
};

type ExtractedContent = {
  text: string;
  lines: Line[];
};

type PreviewProps = {
  responseData: ExtractedContent;
};

const PreviewText: React.FC<PreviewProps> = ({ responseData }) => {
  const { text = "", lines } = responseData;
  return (
    <div className="my-10">
      <h2 className="text-xl font-bold mb-4">Extracted Text</h2>
      <p className="mb-6">{text}</p>

      {lines && lines.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Line-by-Line Analysis</h3>
          <p className="mb-6 text-sm">
            <strong>Confidence:</strong> High (80% and above), Moderate (50% to
            80%), Low (below 50%)
          </p>
          {lines.map((line, index) => {
            console.log(line.words);
            const boldWords = line.words.filter((word) => word.isBold);
            const hasBoldText = boldWords.length > 0;
            const boldText = boldWords.map((word) => word.text).join(" ");
            return (
              <div key={index} className="mb-4 p-4 border rounded shadow-md">
                <p className="mb-2">
                  <strong>Text:</strong> {line.text}
                </p>
                <p>
                  <strong>Confidence:</strong> {line.confidence}%
                  {line.highConfidence && (
                    <span className="text-green-500 mx-2 font-semibold">
                      (High)
                    </span>
                  )}
                  {line.lowConfidence && (
                    <span className="text-red-500 mx-2 font-semibold">
                      (Low)
                    </span>
                  )}
                  {line.moderateConfidence && (
                    <span className="text-orange-500 mx-2 font-semibold">
                      (Moderate)
                    </span>
                  )}
                </p>
                {hasBoldText && (
                  <p className="mt-2">
                    <strong>Bold Text:</strong> {boldText}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PreviewText;
