import { PuffLoader } from "react-spinners";
const ScreenLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[100] flex items-center justify-center">
      <div className="loader">
        <PuffLoader color="#2563EB" size={100} />
      </div>
    </div>
  );
};

export default ScreenLoader;
