"use client";
import { useState } from "react";

interface CompanyTableProps {
  companies: {
    company_id: string;
    company_name_th: string;
    company_name_en: string;
    company_description: string | null;
    company_location: string | null;
    company_province: string | null;
    company_website: string | null;
    company_benefit: string | null;
    company_occuption: string | null;
    company_established: string | null;
    company_is_mou: boolean;
    company_logo: string | null;
    position_descriptions: string | null;
    position_names: string;
    skill_names: string;
    tools_names: string;
  }[];
}

export default function Page({ companies }: CompanyTableProps) {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = companies.slice(startIndex, endIndex);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  return (
    <div className="p-4">
      {/* ตัวเลือกจำนวนรายการ */}
      <div className="mb-4">
        <label htmlFor="itemsPerPage" className="mr-2">
          แสดงรายการต่อหน้า:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border border-gray-300 p-1"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* ตาราง */}
      <div className="overflow-x-auto w-full border border-gray-300 rounded-lg">
        <table className="table-auto border-collapse min-w-[3000px] w-full">
          <thead className="sticky top-0 bg-gray-100 shadow z-10">
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">ลำดับ</th>
              <th className="border border-gray-300 px-4 py-2">
                ชื่อบริษัท (TH)
              </th>
              <th className="border border-gray-300 px-4 py-2">
                ชื่อบริษัท (EN)
              </th>
              <th className="border border-gray-300 px-4 py-2 w-[500px]">
                รายละเอียด
              </th>
              <th className="border border-gray-300 px-4 py-2">ที่อยู่</th>
              <th className="border border-gray-300 px-4 py-2">จังหวัด</th>
              <th className="border border-gray-300 px-4 py-2">เว็บไซต์</th>
              <th className="border border-gray-300 px-4 py-2">สวัสดิการ</th>
              <th className="border border-gray-300 px-4 py-2">ตำแหน่งงาน</th>
              <th className="border border-gray-300 px-4 py-2">ปีที่ก่อตั้ง</th>
              <th className="border border-gray-300 px-4 py-2">MOU</th>
              <th className="border border-gray-300 px-4 py-2">โลโก้</th>
              <th className="border border-gray-300 px-4 py-2">เครื่องมือ</th>
              <th className="border border-gray-300 px-4 py-2">ทักษะ</th>
            </tr>
          </thead>
          <tbody>
            {currentCompanies.map((company, idx) => (
              <tr key={company.company_id}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {startIndex + idx + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.company_name_th}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.company_name_en}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.company_description || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.company_location || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.company_province || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.company_website ? (
                    <a
                      href={company.company_website}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.company_website}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.company_benefit || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.company_occuption || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.company_established || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {company.company_is_mou ? "✅" : "❌"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.company_logo ? (
                    <img
                      src={company.company_logo}
                      alt="Logo"
                      className="h-8 w-8 object-cover"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.tools_names || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.skill_names || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* การนำทางหน้า */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200"
        >
          ก่อนหน้า
        </button>
        <span>
          หน้า {currentPage} จาก {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}
