"use client "
import CompanyTable from "./components/TableComponent";

export default function Page() {
  return (
    <div className="w-full overflow-y-hidden overflow-x-auto">
      <div> 
        <h1 className="text-2xl font-bold text-center p-4">คำขอเพิ่มบริษัท</h1>
      </div>
      <CompanyTable />
    </div>
  );
}
