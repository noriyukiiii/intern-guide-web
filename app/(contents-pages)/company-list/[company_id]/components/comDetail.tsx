"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaLine,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
interface CompanyDetailProps {
  company: {
    company_id: string;
    company_name_th: string;
    company_name_en: string;
    company_benefit: string | null;
    company_description: string | null;
    company_location: string | null;
    company_province: string | null;
    company_website: string | null;
    company_occupation: string | null;
    company_logo: string | null;
    contract_name: string | null;
    contract_email: string | null;
    contract_tel: string | null;
    contract_social: string | null;
    contract_line: string | null;
    position_descriptions: string | null;
    position_names: string;
    skill_names: string;
    tools_names: string;
  };
}

const CompDetail = ({ company }: CompanyDetailProps) => {
  const { session } = useSession();
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (session?.user?.id && company.company_id) {
      fetchFavoriteStatus();
    }
  }, [session?.user?.id, company.company_id]);

  useEffect(() => {
    console.log(isFavorite);
  }, [isFavorite]);

  const fetchFavoriteStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/company/getCompanyFavoite`,
        {
          params: {
            userId: session?.user?.id,
            companyId: company.company_id,
          },
        }
      );
      console.log({ userid: session?.user?.id, companyId: company.company_id });
      console.log(response.data.isFavorite); // ลองดูว่า API คืนค่าอะไรมา

      setIsFavorite(response.data.isFavorite); // <-- จุดสำคัญ
    } catch (error) {
      console.error("Error fetching favorite status:", error);
      setIsFavorite(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!session?.user?.id) return;

    // เปลี่ยนสถานะจาก true เป็น false หรือจาก false เป็น true
    const newStatus = !isFavorite;
    setIsFavorite(newStatus);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/update-favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.user.id,
            companyId: company.company_id,
            isSelected: newStatus,
          }),
        }
      );

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

  const handleback = () => {
    // ใช้ router.back() เพื่อกลับไปหน้าก่อนหน้า
    router.back();
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-8 bg-white rounded-xl border border-gray-200 font-Prompt">
      {/* Header Section */}
      <div className="flex items-center mb-6 relative">
        {/* ปุ่มย้อนกลับที่ฝั่งซ้าย */}
        <Button
          onClick={handleback}
          className="absolute left-0 bg-transparent text-blue-800 text-[20px] hover:bg-gray-200 lg:left-0 lg:ml-0 lg:w-auto lg:h-auto"
        >
          <div className="flex flex-row items-center gap-2">
            <ChevronLeftIcon className="w-6 h-6" />
            <p className="hidden lgg-block">ย้อนกลับ</p> {/* ซ่อนบนมือถือ */}
          </div>
        </Button>

        {/* ข้อความ "รายละเอียดบริษัท" อยู่ตรงกลาง */}
        <div className="text-2xl font-bold text-gray-800 text-center flex-1">
          รายละเอียดบริษัท
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Company Logo */}
        <div className="flex w-full md:w-1/3 justify-center">
          <img
            src={
              company.company_logo ||
              "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg"
            }
            alt="Company Logo"
            className="max-w-full max-h-36 object-contain rounded-xl border border-gray-300"
          />
        </div>

        {/* Company Information */}
        <div className="flex-1 w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {company.company_name_en || "Unknown Company"}
          </h1>
          <h2 className="text-xl text-gray-600 mb-4">
            {company.company_name_th || "ชื่อบริษัท (ภาษาไทย)"}
          </h2>

          {company.company_description && (
            <p className="text-gray-700 mb-4">{company.company_description}</p>
          )}

          <div className="bg-blue-100 text-blue-800 p-4 rounded-xl mb-6">
            <h3 className="text-lg font-semibold">สวัสดิการ</h3>
            <p>{company.company_benefit || "- ไม่มีข้อมูล"}</p>
          </div>
          {/* Website */}
          {/* Divider */}
          <hr className="my-6" />
          {company.company_website && (
            <div className="bg-blue-100 text-blue-800 p-4 rounded-xl mb-6">
              <h3 className="text-lg font-semibold">เว็บไซต์</h3>
              <a
                href={company.company_website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                {company.company_website}
              </a>
            </div>
          )}

          {/* Location and Province */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-500" />
              <p>{company.company_location || "ไม่มีข้อมูล"}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-500" />
              <p>{company.company_province || "ไม่มีข้อมูล"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6" />

      {/* Contact Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {company.contract_name && (
          <div className="flex items-center gap-2">
            <FaUser className="text-gray-500" />
            <p>{company.contract_name}</p>
          </div>
        )}
        {company.contract_email && (
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-gray-500" />
            <a
              href={`mailto:${company.contract_email}`}
              className="text-blue-600 underline hover:text-blue-800"
            >
              {company.contract_email}
            </a>
          </div>
        )}
        {company.contract_tel && (
          <div className="flex items-center gap-2">
            <FaPhone className="text-gray-500" />
            <a
              href={`tel:${company.contract_tel}`}
              className="text-blue-600 underline hover:text-blue-800"
            >
              {company.contract_tel}
            </a>
          </div>
        )}
        {company.contract_line && (
          <div className="flex items-center gap-2">
            <FaLine className="text-gray-500" />
            <p>{company.contract_line}</p>
          </div>
        )}
      </div>

      {/* Divider */}
      <hr className="my-6" />
      <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg ">
        {/* Occupation Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            ตำแหน่งที่เปิดรับ
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* สายการเรียน */}
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-medium text-blue-600">สายการเรียน</h4>
              <p className="text-blue-700">
                {company.company_occupation === "both"
                  ? "ทั้งสองสาย"
                  : company.company_occupation === "Network"
                    ? "Network"
                    : company.company_occupation === "database"
                      ? "Database"
                      : company.company_occupation === "No_Info"
                        ? "ไม่มีข้อมูล"
                        : company.company_occupation}
              </p>
            </div>

            {/* ตำแหน่ง */}
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-medium text-blue-600">ตำแหน่ง</h4>
              <p className="text-blue-700">
                {company.position_names && company.position_names !== "Unknown"
                  ? company.position_names
                  : "ไม่มีข้อมูล"}
              </p>
            </div>

            {/* ตำแหน่งงาน */}
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-medium text-blue-600">ตำแหน่งงาน</h4>
              <p className="text-blue-700">
                {company.position_descriptions &&
                company.position_descriptions !== "Unknown"
                  ? company.position_descriptions
                  : "ไม่มีข้อมูล"}
              </p>
            </div>
          </div>
        </div>

        {/* Skills and Tools Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            ทักษะและเครื่องมือ
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-green-600">
                ทักษะที่ต้องการ
              </h4>
              <p className="text-green-700">
                {company.skill_names
                  ? company.skill_names
                      .split(",")
                      .filter((tool) => tool.trim() !== "Unknown")
                      .join(", ") || "ไม่มีข้อมูล"
                  : "ไม่มีข้อมูล"}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-medium text-green-600">เครื่องมือ</h4>
              <p className="text-green-700">
                {company.tools_names
                  ? company.tools_names
                      .split(",")
                      .filter((tool) => tool.trim() !== "Unknown")
                      .join(", ") || "ไม่มีข้อมูล"
                  : "ไม่มีข้อมูล"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Button
          className={`w-full py-3 rounded-xl transition ${
            isFavorite
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          } text-white`}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? "ลบออกจากรายการโปรด" : "เพิ่มรายการโปรด"}
        </Button>
      </div>
    </div>
  );
};

export default CompDetail;
