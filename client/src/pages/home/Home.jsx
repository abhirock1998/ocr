import React from "react";
import UploadImage from "../../components/home/Upload";
import PreviewImage from "../../components/home/PreviewImage";
import PreviewText from "../../components/home/PreviewText";
import Navbar from "../../components/shared/Navbar";
import Button from "../../components/shared/Button";
import { useApiHook } from "../../hooks/useAuth";
import { useAppStore } from "../../context/AuthProvider";

const Home = () => {
  const [file, setFile] = React.useState(null);
  const [responseData, setResponseData] = React.useState(null);
  const apiCall = useApiHook();
  const { showLoader, hideLoader } = useAppStore();

  const handleUpload = (file) => setFile(file);

  const handleReset = () => {
    setFile(null);
    setResponseData(null);
  };

  const handleExtractText = async () => {
    const formData = new FormData();
    showLoader();
    formData.append("file", file);
    const result = await apiCall(formData, "ocr");
    hideLoader();
    if (result) {
      setResponseData(result);
    } else {
      console.log("Error in extracting text");
      setFile(null);
    }
  };

  return (
    <section className="h-full bg-gray-100 overflow-y-scroll">
      <Navbar />
      <div className="h-full mt-[60px] py-10 flex flex-col md:w-[80%] w-[90%] mx-auto">
        <div className="w-full flex justify-center md:flex-row flex-col gap-4 border border-gray-200 md:h-[50%] transition-all duration-200 shadow-2xl rounded-md">
          <div className="md:w-1/2 p-5">
            <UploadImage onUpload={handleUpload} fileData={file} />
          </div>
          <div className="md:w-1/2 md:h-auto max-h-[25rem] h-[25rem]">
            <PreviewImage file={file} />
          </div>
        </div>
        {file && (
          <>
            <div className="my-10 flex justify-center items-center">
              {responseData ? (
                <Button className="w-[100px]" onClick={handleReset}>
                  Reset
                </Button>
              ) : (
                <Button className="w-[200px]" onClick={handleExtractText}>
                  Extract Text
                </Button>
              )}
            </div>
          </>
        )}
        {responseData && <PreviewText responseData={responseData} />}
      </div>
    </section>
  );
};

export default Home;
