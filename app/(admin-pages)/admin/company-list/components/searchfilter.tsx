"use client";

import { useEffect, useState } from "react";
import Table from "./table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
    company_occuption: string | null; // เพิ่ม occuption
    company_established: string | null; // เพิ่ม established
    company_is_mou: boolean; // เพิ่ม isMou
    company_logo: string | null;
    position_descriptions: string | null;
    position_names: string;
    skill_names: string;
    tools_names: string;
  }[];
}
const SearchFilter = ({ companies }: CompanyTableProps) => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<string>(""); // ตำแหน่ง
  const [selectedSkill, setSelectedSkill] = useState<string>(""); // ทักษะ
  const [selectedProvince, setSelectedProvince] = useState<string>(""); // จังหวัด
  const [selectedPositionDescription, setSelectedPositionDescription] =
    useState<string>(""); // คำอธิบายตำแหน่ง
  const [selectedOccuption, setSelectedOccuption] = useState<string>(""); // ฟิลเตอร์อาชีพ
  const [selectedEstablished, setSelectedEstablished] = useState<string>(""); // ฟิลเตอร์ปีที่ก่อตั้ง
  const [selectedIsMou, setSelectedIsMou] = useState<string>(""); // ฟิลเตอร์บริษัทใน MOU
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // จำนวนรายการต่อหน้า
  const [currentPage, setCurrentPage] = useState<number>(1); // หน้าปัจจุบัน

  const HandleInsertButton = () => {
    router.push("/admin/company-list/insert-company");
  };



  // คำนวณรายการที่ต้องแสดง
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const uniquePositions = Array.from(
    new Set(
      companies.flatMap((c) => c.position_names.split(",").map((p) => p.trim())) // แยกด้วย "," และลบช่องว่าง
    )
  );

  const uniqueSkills = Array.from(
    new Set(
      companies.flatMap((c) => c.skill_names.split(",").map((s) => s.trim())) // แยกด้วย "," และลบช่องว่าง
    )
  );

  const uniqueProvinces = Array.from(
    new Set(companies.map((c) => c.company_province))
  );

  const uniquePositionDescriptions = Array.from(
    new Set(
      companies.flatMap((c) =>
        c.position_descriptions
          ? c.position_descriptions.split(",").map((p) => p.trim())
          : []
      )
    )
  );

  const uniqueOccuptions = Array.from(
    new Set(companies.map((c) => c.company_occuption))
  );

  const uniqueEstablished = Array.from(
    new Set(companies.map((c) => c.company_established))
  );

  const filteredCompanies = companies.filter((company) => {
    const normalize = (str: string) => str?.replace(/\s+/g, "").toLowerCase(); // ลบช่องว่างและแปลงเป็นตัวพิมพ์เล็ก
    const normalizedSearch = normalize(searchTerm); // Normalize คำค้นหา

    return (
      (normalize(company.company_name_th).includes(normalizedSearch) ||
        normalize(company.company_name_en).includes(normalizedSearch)) &&
      (selectedPosition === "" ||
        company.position_names
          .split(",")
          .map((p) => p.trim())
          .includes(selectedPosition)) &&
      (selectedSkill === "" ||
        company.skill_names
          .split(",")
          .map((s) => s.trim())
          .includes(selectedSkill)) &&
      (selectedProvince === "" ||
        company.company_province === selectedProvince) &&
      (selectedPositionDescription === "" ||
        company.position_descriptions
          ?.split(",")
          .map((p) => p.trim())
          .includes(selectedPositionDescription)) &&
      (selectedOccuption === "" ||
        company.company_occuption === selectedOccuption) &&
      (selectedEstablished === "" ||
        company.company_established === selectedEstablished) &&
      (selectedIsMou === "" ||
        (selectedIsMou === "true" && company.company_is_mou) ||
        (selectedIsMou === "false" && !company.company_is_mou))
    );
  });

  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex); // การตัดข้อมูลที่ต้องแสดงให้สอดคล้องกับหน้าและจำนวนที่แสดงต่อหน้า

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // รีเซ็ตหน้าเมื่อมีการเปลี่ยนแปลงการค้นหาหรือการกรอง
  }, [
    searchTerm,
    selectedPosition,
    selectedSkill,
    selectedProvince,
    selectedPositionDescription,
    selectedOccuption,
    selectedEstablished,
    selectedIsMou,
    itemsPerPage, // เพิ่ม itemsPerPage ใน dependancy ของ useEffect
  ]);
  
  return (
    <div className="">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          ค้นหาบริษัท
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Search Input */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              ค้นหาด้วยชื่อบริษัท
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ชื่อบริษัท..."
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Filter by Occuption */}
          <div>
            <label
              htmlFor="occuption"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              สายการเรียน
            </label>
            <select
              id="occuption"
              value={selectedOccuption}
              onChange={(e) => setSelectedOccuption(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">ทั้งหมด</option>
              <option value="database">Database</option>
              <option value="Network">Network</option>
              <option value="No_Info">อื่นๆ</option>
            </select>
          </div>

          {/* Filter by Established Year */}
          <div>
            <label
              htmlFor="established"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              สังกัด/หน่วยงาน
            </label>
            <select
              id="established"
              value={selectedEstablished}
              onChange={(e) => setSelectedEstablished(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">ทั้งหมด</option>
              {uniqueEstablished
                .filter((info) => info && info.trim() !== "") // 🔥 กรองค่าที่ว่างออก
                .map((info) => (
                  <option key={info} value={info || ""}>
                    {info}
                  </option>
                ))}
            </select>
          </div>

          {/* Filter by MOU Status */}
          <div>
            <label
              htmlFor="is-mou"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              MOU
            </label>
            <select
              id="is-mou"
              value={selectedIsMou}
              onChange={(e) => setSelectedIsMou(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">ทั้งหมด</option>
              <option value="true">ใช่</option>
              <option value="false">ไม่ใช่</option>
            </select>
          </div>

          {/* Filter by Position */}
          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              ตำแหน่ง
            </label>
            <select
              id="position"
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">ทั้งหมด</option>
              {uniquePositions
                .filter((position) => position && position.trim() !== "") // 🔥 กรองค่าที่ว่างออก
                .map((position) => (
                  <option key={position} value={position}>
                    {position === "Unknown" ? "ไม่มีข้อมูล" : position}{" "}
                    {/* 🔥 แสดงเป็น ไม่มีข้อมูล */}
                  </option>
                ))}
            </select>
          </div>
          {/* Filter by Position Description */}
          <div>
            <label
              htmlFor="position-description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              ตำแหน่งงาน
            </label>
            <select
              id="position-description"
              value={selectedPositionDescription}
              onChange={(e) => setSelectedPositionDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">ทั้งหมด</option>
              {uniquePositionDescriptions.map((desc) => (
                <option key={desc} value={desc}>
                  {desc === "Unknown" ? "ไม่มีข้อมูล" : desc}
                </option>

              ))}
            </select>
          </div>

          {/* Filter by Skill */}
          <div>
            <label
              htmlFor="skill"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              ทักษะ
            </label>
            <select
              id="skill"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">ทั้งหมด</option>
              {uniqueSkills
                .filter((skill) => skill && skill.trim() !== "") // กรองค่าว่าง
                .map((skill) => (
                  <option key={skill} value={skill}>
                    {skill === "Unknown" ? "ไม่มีข้อมูล" : skill}
                  </option>
                ))}
            </select>
          </div>

          {/* Filter by Province */}
          <div>
            <label
              htmlFor="province"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              จังหวัด
            </label>
            <select
              id="province"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">ทั้งหมด</option>
              {uniqueProvinces
                .filter((province) => province && province.trim() !== "") // 🔥 กรองค่าที่ว่างออก
                .map((province) => (
                  <option key={province} value={province || ""}>
                    {province}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end items-center mt-4">
        <Button onClick={HandleInsertButton}>
              เพิ่มสถานประกอบการ
        </Button>
      </div>
      <div className="">
        <Table companies={paginatedCompanies} />
      </div>
      <div className="flex flex-row gap-2 justify-center items-center mb-4">
        {/* Select Items Per Page */}

        {/* <div className="m-4 w-24 flex flex-col ">
          <label
            htmlFor="itemsPerPage"
            className="block text-sm font-medium text-gray-700"
          >
            แสดงผลต่อหน้า
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={100}>100</option>
          </select>
        </div> */}
        {/* Pagination Controls */}
        <div className="mt-6 flex justify-center items-center space-x-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
          >
            ก่อนหน้า
          </button>
          <span>
            หน้า {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-blue-500 text-white"
            }`}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
