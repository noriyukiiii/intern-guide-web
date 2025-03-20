"use client ";
import { ToastContainer } from "react-toastify";
import CancelTable from "./components/table";

export default function Page() {
  return (
    <div className="w-full overflow-y-hidden overflow-x-auto">
      <ToastContainer />
      <div>
        <h1 className="text-2xl font-bold text-center p-4">
          คำขอแก้ไขข้อมูลบริษัท
        </h1>
      </div>
      <CancelTable />
    </div>
  );
}
