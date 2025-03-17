"use client ";

import CancelTable from "./components/table";

export default function Page() {
  return (
    <div className="w-full overflow-y-hidden overflow-x-auto">
      <div>
        <h1 className="text-2xl font-bold text-center p-4">คำขอยกเลิกบริษัท</h1>
      </div>
      <CancelTable />
    </div>
  );
}
