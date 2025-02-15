"use client";
import { useState } from "react";
import { Company } from "@/lib/dashboardtype";
import { ChevronUp, ChevronDown } from "lucide-react";

interface CompanyTableProps {
  allData: Company[];
}

export default function CompanyTable({ allData }: CompanyTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  const sortedData = [...allData].sort((a, b) => {
    if (sortConfig !== null) {
      const aValue = a[sortConfig.key as keyof Company];
      const bValue = b[sortConfig.key as keyof Company];

      // Handle "positions" sorting logic
      if (sortConfig.key === "positions") {
        const aPosition = a.positions.some((pos) => pos.name === "Unknown")
          ? "ไม่มีข้อมูล"
          : "มีข้อมูล";
        const bPosition = b.positions.some((pos) => pos.name === "Unknown")
          ? "ไม่มีข้อมูล"
          : "มีข้อมูล";

        if (aPosition < bPosition) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aPosition > bPosition) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      }

      // Handle "occupation" sorting logic
      if (sortConfig.key === "occupation") {
        // Define the desired order
        const order = ["database", "Network", "both", "No_Info"];
        const aIndex = order.indexOf(a.occupation);
        const bIndex = order.indexOf(b.occupation);

        if (aIndex < bIndex) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aIndex > bIndex) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      }

      // Handle null or undefined values for other keys
      if (aValue === null || aValue === undefined) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (bValue === null || bValue === undefined) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }

      // Normal sorting for non-null values
      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name: string) => {
    if (!sortConfig) return;
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="m-6 border rounded-lg shadow-md overflow-hidden font-Prompt mx-[50px]">
      <div className="max-h-[500px] overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white z-10 shadow-md">
            <tr>
              <th className="p-3 text-center border-b w-2 ">ลำดับ</th>
              <th className="p-3 text-left border-b ">
                <div className="flex items-center">
                  <span>ชื่อบริษัท (TH)</span>
                </div>
              </th>
              <th
                className="p-3 text-left border-b cursor-pointer"
                onClick={() => requestSort("occupation")}
              >
                <div className="flex items-center">
                  <span>สายการเรียน</span>
                  <span className="ml-auto">
                    {getClassNamesFor("occupation") === "ascending" ? (
                      <ChevronUp size={16} />
                    ) : getClassNamesFor("occupation") === "descending" ? (
                      <ChevronDown size={16} />
                    ) : null}
                  </span>
                </div>
              </th>
              <th
                className="p-3 text-left border-b cursor-pointer"
                onClick={() => requestSort("positions")}
              >
                <div className="flex items-center">
                  <span>ตำแหน่ง</span>
                  <span className="ml-auto">
                    {getClassNamesFor("positions") === "ascending" ? (
                      <ChevronDown size={16} />
                    ) : getClassNamesFor("positions") === "descending" ? (
                      <ChevronUp size={16} />
                    ) : null}
                  </span>
                </div>
              </th>
              <th
                className="p-3 text-center border-b w-[150px] cursor-pointer"
                onClick={() => requestSort("benefit")}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>สวัสดิการ</span>
                  <span className="">
                    {getClassNamesFor("benefit") === "ascending" ? (
                      <ChevronUp size={16} />
                    ) : getClassNamesFor("benefit") === "descending" ? (
                      <ChevronDown size={16} />
                    ) : null}
                  </span>
                </div>
              </th>
              <th
                className="p-3 text-left border-b cursor-pointer"
                onClick={() => requestSort("location")}
              >
                <div className="flex items-center">
                  <span>จังหวัด</span>
                  <span className="ml-auto">
                    {getClassNamesFor("location") === "ascending" ? (
                      <ChevronUp size={16} />
                    ) : getClassNamesFor("location") === "descending" ? (
                      <ChevronDown size={16} />
                    ) : null}
                  </span>
                </div>
              </th>
              {/* <th className="p-3 text-left border-b">
                <div className="flex justify-center items-center text-center">
                  <span>5</span>
                </div>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((company: Company, index: number) => (
              // Wrap each row in a group and relative container.
              <tr key={company.id} className="even:bg-gray-100 group relative">
                <td className="p-3 border-b truncate max-w-[50px] text-center">
                  {index + 1}
                </td>
                <td className="p-3 border-b truncate max-w-[150px]">
                  {company.companyNameTh}
                </td>
                <td className="p-3 border-b truncate max-w-[150px]">
                  {company.occupation === "No_Info"
                    ? "ไม่มีข้อมูล"
                    : company.occupation === "Network"
                      ? "Network"
                      : company.occupation === "database"
                        ? "Database"
                        : company.occupation === "both"
                          ? "ทั้งสองสาย"
                          : company.occupation}
                </td>
                <td className="p-3 border-b truncate max-w-[150px]">
                  {company.positions.map((position: { name: string }, idx) => (
                    <span key={idx}>
                      {position.name === "Unknown"
                        ? "ไม่มีข้อมูล"
                        : position.name}
                      {idx < company.positions.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </td>
                <td>
                  <div
                    className={`flex justify-center mx-6 rounded-2xl p-2 truncate max-w-[120px] ${
                      company.benefit
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {company.benefit ? "มีสวัสดิการ" : "ไม่มีข้อมูล"}
                  </div>
                </td>
                <td className="p-3 border-b truncate max-w-[200px]">
                  {company.province}
                </td>
                {/* <td>5</td> */}

                {/* Tooltip or additional info on hover */}
                <td className="absolute left-0 top-0 w-full bg-gray-50 border rounded shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <div className="flex flex-col">
                    <p className="text-md font-semibold ">
                      {company.companyNameTh}
                    </p>

                    <div className="text-sm">
                      <span>สายการเรียน : </span>
                      {company.occupation === "No_Info"
                        ? "ไม่มีข้อมูล"
                        : company.occupation === "Network"
                          ? "Network"
                          : company.occupation === "database"
                            ? "Database"
                            : company.occupation === "both"
                              ? "ทั้งสองสาย"
                              : company.occupation}{" "}
                      | ตำแหน่ง :{" "}
                      {company.positions.map(
                        (position: { name: string }, idx) => (
                          <span key={idx}>
                            {position.name === "Unknown"
                              ? "ไม่มีข้อมูล"
                              : position.name}
                            {idx < company.positions.length - 1 ? ", " : ""}
                          </span>
                        )
                      )}{" "}
                      | สวัสดิการ :{" "}
                      {company.benefit ? "มีสวัสดิการ" : "ไม่มีข้อมูล"} |
                      จังหวัด : {company.province}
                      <div>ที่ตั้ง : {company.location} </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
