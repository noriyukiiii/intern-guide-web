import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col items-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        <p className="mt-2 text-gray-600 font-medium">กำลังโหลด...</p>
      </div>
    </div>
  );
};

export default Loading;
