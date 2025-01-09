"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CompanyCardProps {
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
    company_established: string| null; // เพิ่ม established
    company_is_mou: boolean; // เพิ่ม isMou
    company_logo: string | null;
    position_descriptions: string | null;
    position_names: string;
    skill_names: string;
    tools_names: string;
  };
}

const CompanyCard = ({ companies }: CompanyCardProps) => {
  return (
    <div
      key={companies.company_id}
      className="border p-4 rounded-3xl shadow font-Prompt mx-8 mt-4"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-center mb-4">
          <img
            src={companies.company_logo || undefined}
            alt={companies.company_name_th || "Company Logo"}
            className="w-auto h-[300px] object-cover rounded-lg border border-gray-200"
          />
        </div>

        <h2 className="text-xl font-bold">{companies.company_name_th}</h2>
        <p className="text-gray-600">{companies.company_name_en}</p>

        <div className="grid grid-cols-5 gap-4 mt-2">
          <div className="col-span-1 flex justify-between font-bold">
            <p className="">สายการเรียน</p>
            <p className="">:</p>
          </div>
          {companies.company_occuption === "both" || "No_info" ? (
            <>
              <p className="col-span-4">ไม่ระบุ</p>
            </>
          ) : (
            <>
            {companies.company_occuption || "ไม่ระบุ"}
            </>
          )}
        </div>

        <div className="grid grid-cols-5 gap-4 mt-2">
          <div className="col-span-1 flex justify-between font-bold">
            <p className="">ที่ตั้ง</p>
            <p className="">:</p>
          </div>
          <p className="col-span-4">
            {companies.company_location || "ไม่ระบุ"}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-4 mt-2">
          <div className="col-span-1 flex justify-between font-bold">
            <p className="">จังหวัด</p>
            <p className="">:</p>
          </div>
          <p className="col-span-4">{companies.company_province || "-"}</p>
        </div>

        {companies.position_descriptions !== "Unknown" ? (
          <div className="grid grid-cols-5 gap-4 mt-2">
            <div className="col-span-1 flex justify-between font-bold">
              <p className="">ตำแหน่ง</p>
              <p className="">:</p>
            </div>
            <p className="col-span-4">
              {companies.position_descriptions || "ไม่ระบุ"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-4 mt-2">
            <div className="col-span-1 flex justify-between font-bold">
              <p className="">ตำแหน่ง</p>
              <p className="">:</p>
            </div>
            <p className="col-span-4">ไม่ระบุ</p>
          </div>
        )}

        <div className="flex justify-end items-end mt-auto">
          <Link href={`/company-list/${companies.company_id}`}>
            <Button className="mt-4 bg-blue-500">View Company Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
