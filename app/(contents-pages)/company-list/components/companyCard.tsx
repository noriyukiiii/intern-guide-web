"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import { Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    company_established: string | null; // เพิ่ม established
    contract_name: string | null;
    contract_email: string | null;
    contract_tel: string | null;
    contract_social: string | null;
    contract_line: string | null;
    company_is_mou: boolean; // เพิ่ม isMou
    company_logo: string | null;
    position_descriptions: string | null;
    position_names: string;
    skill_names: string;
    tools_names: string;
    is_favorite: boolean;
  };
}

const CompanyCard = ({ companies }: CompanyCardProps) => {
  const [isSelected, setIsSelected] = useState(companies.is_favorite);
  const [loading, setLoading] = useState(true); // เพิ่ม loading state
  const { session } = useSession();
  const userId = session.user?.id;

  // เรียกใช้ฟังก์ชัน getFavoriteStatus เมื่อ component โหลด
  useEffect(() => {
    if (userId) {
      // ดึงสถานะจากเซิร์ฟเวอร์
      setLoading(false); // เปลี่ยนค่า loading เป็น false เมื่อการดึงข้อมูลเสร็จสิ้น
    }
  }, [userId]);

  // ฟังก์ชันอัปเดตสถานะรายการโปรด
  const handleToggleFavorite = async () => {
    if (!userId) return;

    const newStatus = !isSelected;
    setIsSelected(newStatus);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_RES_API}/update-favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          companyId: companies.company_id,
          isSelected: newStatus,
        }),
      });

      const responseData = await res.json();

      if (responseData.success) {
        console.log("Favorite updated successfully");
      } else {
        console.error("Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  // ตรวจสอบสถานะการโหลด และแสดงผล
  if (loading) {
    return <div>Loading...</div>; // แสดง "Loading..." ขณะโหลดข้อมูล
  }

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

        {/* Occupation */}
        <div className="grid grid-cols-5 gap-4 mt-2">
          <div className="col-span-1 flex justify-between font-bold">
            <p className="">สายการเรียน</p>
            <p className="">:</p>
          </div>
          <div className="col-span-4">
            <p>
              {companies.company_occuption === "No_Info"
                ? "ไม่มีข้อมูล"
                : companies.company_occuption === "both"
                ? "Network, Database"
                : companies.company_occuption}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-5 gap-4 mt-2">
          <div className="col-span-1 flex justify-between font-bold">
            <p className="">ที่ตั้ง</p>
            <p className="">:</p>
          </div>
          <p className="col-span-4">
            {companies.company_location || "ไม่มีข้อมูล"}
          </p>
        </div>

        {/* Province */}
        <div className="grid grid-cols-5 gap-4 mt-2">
          <div className="col-span-1 flex justify-between font-bold">
            <p className="">จังหวัด</p>
            <p className="">:</p>
          </div>
          <p className="col-span-4">{companies.company_province || "-"}</p>
        </div>

        {/* Position Description */}
        {companies.position_descriptions && companies.position_descriptions !== "Unknown" ? (
          <div className="grid grid-cols-5 gap-4 mt-2">
            <div className="col-span-1 flex justify-between font-bold">
              <p className="">ตำแหน่ง</p>
              <p className="">:</p>
            </div>
            <p className="col-span-4">
              {companies.position_descriptions || "ไม่มีข้อมูล"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-4 mt-2">
            <div className="col-span-1 flex justify-between font-bold">
              <p className="">ตำแหน่ง</p>
              <p className="">:</p>
            </div>
            <p className="col-span-4">ไม่มีข้อมูล</p>
          </div>
        )}

        {/* Favorite Button */}
        <div className="flex justify-end items-end mt-auto gap-2">
          <Button
            onClick={handleToggleFavorite}
            className={`mt-2 ${isSelected ? "bg-green-500" : "bg-gray-500"}`}
            aria-label={isSelected ? "Remove from favorites" : "Add to favorites"}
          >
            <Star color="#fafafa" />
          </Button>

          {/* View Details Button */}
          <Link href={`/company-list/${companies.company_id}`}>
            <Button className="mt-4 bg-blue-500">ดูรายละเอียด</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
