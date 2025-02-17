"use client";
import { useState } from "react";
import { Company } from "@/lib/dashboardtype";
import { ChevronUp, ChevronDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompanyTableProps {
  allData: Company[];
  user: string;
}

export default function CompanyTable({ allData, user }: CompanyTableProps) {
  // ใช้ state สำหรับเก็บข้อมูลบริษัท (เพื่อให้สามารถอัปเดตได้)
  const [companies, setCompanies] = useState<Company[]>(allData);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  // ฟังก์ชันสำหรับจัดการการกด favorite/unfavorite
  const handleToggleFavorite = async (company: Company) => {
    // ตรวจสอบว่ามี userId อยู่หรือไม่
    if (!user) return;

    // คำนวณสถานะใหม่ (toggle)
    const newStatus = !company.isFavorite;

    try {
      // เรียก API เพื่ออัปเดตสถานะ favorite
      const res = await fetch("http://localhost:5555/update-favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user, // ตัวแปร userId ที่ได้มาจาก session หรือ props
          companyId: company.id,
          isSelected: newStatus, // ส่งสถานะใหม่ที่ต้องการอัปเดต
        }),
      });

      const responseData = await res.json();

      if (responseData.success) {
        console.log("Favorite updated successfully");
        // อัปเดต state ใน local เมื่อ API สำเร็จ
        setCompanies((prev) =>
          prev.map((c) =>
            c.id === company.id ? { ...c, isFavorite: newStatus } : c
          )
        );
      } else {
        console.error("Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const sortedData = [...companies].sort((a, b) => {
    if (sortConfig !== null) {
      const aValue = a[sortConfig.key as keyof Company];
      const bValue = b[sortConfig.key as keyof Company];

      // กำหนด logic สำหรับการเรียงลำดับของ positions
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

      // กำหนด logic สำหรับ occupation
      if (sortConfig.key === "occupation") {
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

      // ถ้าค่าเป็น null หรือ undefined ให้จัดการเรียงลำดับ
      if (aValue === null || aValue === undefined) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (bValue === null || bValue === undefined) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }

      // การเรียงลำดับปกติสำหรับค่าอื่น ๆ
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
              <th className="p-3 text-center border-b w-2">ลำดับ</th>
              <th className="p-3 text-left border-b">
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
              <th className="p-3 text-left border-b">
                <div className="flex justify-center items-center text-center">
                  <span></span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((company: Company, index: number) => (
              // แต่ละแถวในตาราง
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
                  {company.positions.map(
                    (position: { name: string }, idx: number) => (
                      <span key={idx}>
                        {position.name === "Unknown"
                          ? "ไม่มีข้อมูล"
                          : position.name}
                        {idx < company.positions.length - 1 ? ", " : ""}
                      </span>
                    )
                  )}
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
                {/* ปุ่มสำหรับ Favorite */}
                <td className="p-3 border-b text-center">
                  {/* <button
                    onClick={() => handleToggleFavorite(company)}
                    className={`p-2 rounded ${
                      company.isFavorite
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {company.isFavorite ? "Unfavorite" : "Favorite"}
                  </button> */}
                  <Button
                    onClick={() => handleToggleFavorite(company)}
                    className={`mt-2  ${company.isFavorite ? "bg-green-500 hover:bg-red-500" : "bg-gray-500 hover:bg-green-500"}`}
                    aria-label={
                      company.isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    <Star color="#fafafa" />
                  </Button>
                  <div className="absolute left-1/2 top-full transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out pointer-events-none bg-gray-50 border rounded shadow-lg p-2 w-max z-20">
                    <div className="flex flex-col">
                      <p className="text-md font-semibold">
                        {company.companyNameTh}
                      </p>
                      <div className="text-sm">
                        <span>สายการเรียน: </span>
                        {company.occupation === "No_Info"
                          ? "ไม่มีข้อมูล"
                          : company.occupation === "Network"
                            ? "Network"
                            : company.occupation === "database"
                              ? "Database"
                              : company.occupation === "both"
                                ? "ทั้งสองสาย"
                                : company.occupation}{" "}
                        | ตำแหน่ง:{" "}
                        {company.positions.map(
                          (position: { name: string }, idx: number) => (
                            <span key={idx}>
                              {position.name === "Unknown"
                                ? "ไม่มีข้อมูล"
                                : position.name}
                              {idx < company.positions.length - 1 ? ", " : ""}
                            </span>
                          )
                        )}{" "}
                        | สวัสดิการ:{" "}
                        {company.benefit ? "มีสวัสดิการ" : "ไม่มีข้อมูล"} |
                        จังหวัด: {company.province}
                        <div>ที่ตั้ง: {company.location}</div>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Tooltip หรือข้อมูลเพิ่มเติมเมื่อ hover */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
