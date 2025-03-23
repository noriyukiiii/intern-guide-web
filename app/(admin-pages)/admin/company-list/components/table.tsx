"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import Modal from "./modal";
import Link from "next/link";
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // state สำหรับเก็บ URL ของรูปที่คลิก

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = companies.slice(startIndex, endIndex);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  const softdeleteCompany = async (companyId: string) => {
    try {
      // ตัวอย่างการเรียก API เพื่อทำ soft delete โดยการตั้งค่า deletedAt
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/company/softdeleteCompany/${companyId}`,
        {
          method: "PATCH", // ใช้ PATCH แทน DELETE เพื่อทำการอัปเดตฟิลด์ deletedAt
        }
      );

      // ตรวจสอบสถานะการตอบกลับ
      if (response.ok) {
        // หากสำเร็จให้แสดงข้อความ
        alert("Company Soft deleted successfully");
        // คุณสามารถอัปเดต UI หรือการแสดงผล เช่น ลบบริษัทออกจากรายการหรือรีเฟรชหน้าจอ
        window.location.reload(); // รีเฟรชหน้าเว็บ
      } else {
        throw new Error("Failed to Soft delete company");
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      alert("Failed to delete company");
    }
  };

  const deleteCompany = async (companyId: string) => {
    try {
      // ตัวอย่างการเรียก API เพื่อทำ soft delete โดยการตั้งค่า deletedAt
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/company/deleteCompany/${companyId}`,
        {
          method: "DELETE", // ใช้ PATCH แทน DELETE เพื่อทำการอัปเดตฟิลด์ deletedAt
        }
      );

      // ตรวจสอบสถานะการตอบกลับ
      if (response.ok) {
        // หากสำเร็จให้แสดงข้อความ
        alert("Company deleted successfully");
        // คุณสามารถอัปเดต UI หรือการแสดงผล เช่น ลบบริษัทออกจากรายการหรือรีเฟรชหน้าจอ
        window.location.reload(); // รีเฟรชหน้าเว็บ
      } else {
        throw new Error("Failed to delete company");
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      alert("Failed to delete company");
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl); // เมื่อคลิกรูป จะตั้งค่า URL ของรูปให้กับ state
  };

  const closeModal = () => {
    setSelectedImage(null); // ปิด Modal
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* ตัวเลือกจำนวนรายการ */}

      {/*  Table Chadcn */}
      <div className="overflow-x-auto border-gray-300 h-[500px] max-h-[800px] min-h-[800px] border-1 rounded flex-1">
        <Table className="min-w-[3000px] h-[800px] font-Prompt border">
          <TableHeader className="">
            <TableRow className="">
              {/* <TableHead className="w-[100px] text-center border-r border-gray-300">
                ลำดับ
              </TableHead> */}
              <TableHead className="w-[400px] text-center border-r border-gray-300">
                ชื่อบริษัท{"(ไทย)"}
              </TableHead>
              <TableHead className="w-[400px] text-center border-r border-gray-300">
                ชื่อบริษัท{"(อังกฤษ)"}
              </TableHead>
              <TableHead className="w-[900px] text-center border-r border-gray-300">
                คำอธิบาย
              </TableHead>
              <TableHead className="w-[800px] text-center border-r border-gray-300">
                ที่ตั้ง
              </TableHead>
              <TableHead className="w-[150px] text-center border-r border-gray-300">
                จังหวัด
              </TableHead>
              <TableHead className="w-[150px] text-center border-r border-gray-300">
                เว็บไซต์บริษัท
              </TableHead>
              <TableHead className="w-[300px] text-center border-r border-gray-300">
                Benefit
              </TableHead>
              <TableHead className="w-[150px] text-center border-r border-gray-300">
                สายการเรียน
              </TableHead>
              <TableHead className="w-[150px] text-center border-r border-gray-300">
                สังกัดหน่วยงาน
              </TableHead>
              <TableHead className="w-[150px] text-center border-r border-gray-300">
                MOU
              </TableHead>
              <TableHead className="w-[150px] text-center border-r border-gray-300">
                ภาพบริษัท
              </TableHead>
              <TableHead className="w-[300px] text-center border-r border-gray-300">
                สายงาน
              </TableHead>
              <TableHead className="w-[300px] text-center border-r border-gray-300">
                ตำแหน่ง
              </TableHead>
              <TableHead className="w-[300px] text-center border-r border-gray-300">
                ทักษะ
              </TableHead>
              <TableHead className="w-[300px] text-center border-r border-gray-300">
                เครื่องมือ
              </TableHead>
              <TableHead className="w-[150px] text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCompanies.map((company, idx) => (
              <TableRow key={company.company_id}>
                {/* <TableCell className="border border-gray-300 px-4 py-2 text-center">
                  {startIndex + idx + 1}
                </TableCell> */}
                <TableCell className="border border-gray-300 px-4 py-2">
                  {company.company_name_th}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">
                  {company.company_name_en}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">
                  {company.company_description || "N/A"}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">
                  {company.company_location || "N/A"}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">
                  {company.company_province || "N/A"}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2 text-center">
                  {company.company_website ? (
                    <button
                      className="text-blue-500 underline"
                      onClick={() => {
                        if (company.company_website) {
                          window.open(
                            company.company_website,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }
                      }}
                    >
                      เว็บไซต์
                    </button>
                  ) : (
                    "N/A"
                  )}
                </TableCell>

                <TableCell className="border border-gray-300 px-4 py-2">
                  {company.company_benefit
                    ? company.company_benefit
                        .split("-") // แยกข้อความตามเครื่องหมาย "-"
                        .filter((benefit) => benefit.trim() !== "") // กรองรายการที่เป็นช่องว่าง
                        .map((benefit, index) => (
                          <div key={index}>
                            {"-"} {benefit.trim()}
                          </div> // แสดงผลแต่ละรายการใน div
                        ))
                    : "N/A"}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2 text-left">
                  {company.company_occuption || "N/A"}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2 text-center">
                  {company.company_established || "N/A"}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2 text-center">
                  {company.company_is_mou ? "✅" : "❌"}
                </TableCell>
                <TableCell className=" px-4 py-2 h-full w-full flex justify-center items-center ">
                  {company.company_logo ? (
                    <img
                      src={company.company_logo}
                      alt="Logo"
                      className="h-8 w-8 object-cover cursor-pointer"
                      onClick={() =>
                        handleImageClick(company.company_logo || "")
                      } // On click to show the popup
                    />
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">
                  {company.position_names
                    ? company.position_names
                        .split(",") // แยกข้อความตามเครื่องหมาย ","
                        .map((position) => position.trim()) // ลบช่องว่างรอบๆ ข้อความ
                        .filter(
                          (position) =>
                            position !== "" && position !== "Unknown"
                        ) // กรองรายการที่ว่างเปล่าและ "Unknown"
                        .map((position, index) => (
                          <div key={index}>
                            {"-"} {position}
                          </div> // แสดงผลแต่ละรายการใน div
                        ))
                    : "N/A"}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">
                  {company.position_descriptions
                    ? company.position_descriptions
                        .split(",") // แยกข้อความตามเครื่องหมาย ","
                        .map((description) => description.trim()) // ลบช่องว่างรอบๆ ข้อความ
                        .filter(
                          (description) =>
                            description !== "" && description !== "Unknown"
                        ) // กรองรายการที่ว่างเปล่าและ "Unknown"
                        .map((description, index) => (
                          <div key={index}>
                            {"-"} {description}
                          </div> // แสดงผลแต่ละรายการใน div
                        ))
                    : "N/A"}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">
                  {company.skill_names
                    ? company.skill_names
                        .split(",") // แยกข้อความตามเครื่องหมาย ","
                        .map((skill) => skill.trim()) // ลบช่องว่างรอบๆ ข้อความ
                        .filter((skill) => skill !== "" && skill !== "Unknown") // กรองรายการที่ว่างเปล่าและ "Unknown"
                        .map((skill, index) => (
                          <div key={index}>
                            {"-"} {skill}
                          </div> // แสดงผลแต่ละรายการใน div
                        ))
                    : "N/A"}
                </TableCell>

                <TableCell className="border border-gray-300 px-4 py-2">
                  {company.tools_names
                    ? company.tools_names
                        .split(",") // แยกข้อความตามเครื่องหมาย ","
                        .map((tool) => tool.trim()) // ลบช่องว่างรอบๆ ข้อความ
                        .filter((tool) => tool !== "" && tool !== "Unknown") // กรองรายการที่ว่างเปล่าและ "Unknown"
                        .map((tool, index) => (
                          <div key={index}>
                            {"-"} {tool}
                          </div> // แสดงผลแต่ละรายการใน div
                        ))
                    : "N/A"}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2 text-center">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/company-list/edit/${company.company_id}`}
                    >
                      <button className="px-4 py-2 bg-blue-500 text-white rounded">
                        แก้ไข
                      </button>
                    </Link>

                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded"
                      onClick={() => deleteCompany(company.company_id)} // Pass the company id here
                    >
                      ลบ
                    </button>
                    {/* <button
                      className="px-4 py-2 bg-red-500 text-white rounded"
                      onClick={() => softdeleteCompany(company.company_id)} // Pass the company id here
                    >
                      ลบ (soft)
                    </button> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedImage && <Modal imageUrl={selectedImage} onClose={closeModal} />}
    </div>
  );
}
