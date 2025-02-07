import { Button } from "@/components/ui/button";
import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaLine,
  FaUser,
  FaTools,
  FaMapMarkerAlt,
} from "react-icons/fa";

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
  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-200 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Company Logo */}
        <div className="flex w-full md:w-1/3 items-center justify-center">
          <img
            src={
              company.company_logo ||
              "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg"
            }
            alt="Company Logo"
            className="max-w-full max-h-40 object-contain rounded-lg border border-gray-200"
          />
        </div>

        {/* Company Information */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {company.company_name_en || "Unknown Company"}
          </h1>
          <h2 className="text-xl text-gray-600 mb-4">
            {company.company_name_th || "ชื่อบริษัท (ภาษาไทย)"}
          </h2>

          {company.company_description && (
            <p className="text-gray-700 mb-4">{company.company_description}</p>
          )}

          {company.company_benefit && (
            <div className="bg-blue-100 text-blue-800 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold">สวัสดิการ</h3>
              <p>{company.company_benefit}</p>
            </div>
          )}

          {/* Location and Province */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-500" />
              <p>{company.company_location || "ไม่ระบุ"}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-500" />
              <p>{company.company_province || "ไม่ระบุ"}</p>
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
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          ตำแหน่งที่เปิดรับ
        </h3>

        {/* Occupation Section */}
        {company.company_occupation && (
          <div className="my-2">
            <h4 className="text-lg font-medium text-gray-700">สายการเรียน</h4>
            <p className="text-gray-600">{company.company_occupation}</p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-gray-700">ตำแหน่ง</h4>
            <p className="text-gray-600">
              {company.position_names && company.position_names !== "Unknown"
                ? company.position_names
                : "ไม่ระบุ"}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700">ตำแหน่งงาน</h4>
            <p className="text-gray-600">
              {company.position_descriptions &&
              company.position_descriptions !== "Unknown"
                ? company.position_descriptions
                : "ไม่ระบุ"}
            </p>
          </div>
        </div>
      </div>

      {/* Skills and Tools */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-4">
          ทักษะและเครื่องมือ
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-gray-700">
              ทักษะที่ต้องการ
            </h4>
            <p className="text-gray-600">
              {company.skill_names && company.skill_names !== "Unknown"
                ? company.skill_names
                : "ไม่ระบุ"}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700">เครื่องมือ</h4>
            <p className="text-gray-600">
              {company.tools_names && company.tools_names !== "Unknown"
                ? company.tools_names
                : "ไม่ระบุ"}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6" />

      {/* Website */}
      {company.company_website && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">เว็บไซต์</h3>
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
      <div>
        <Button>
          เลือกสถานประกอบการนี้เพื่อออกสหกิจ
        </Button>
      </div>
    </div>
  );
};

export default CompDetail;
