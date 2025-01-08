"use client";

import Image from "next/image";

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
    company_logo: string | null;
    position_descriptions: string | null;
    position_names: string;
    skill_names: string;
    tools_names: string;
  };
}

const CompanyCard = ({ companies }: CompanyCardProps) => {
  return (
    <div key={companies.company_id} className="border p-4 rounded shadow">
      <img src={companies.company_logo || ""} alt="" className="w-[500px] h-[500px]" />
      <h2 className="text-xl font-bold">{companies.company_name_th}</h2>
      <p className="text-gray-600">{companies.company_name_en}</p>
      <p className="text-gray-600">{companies.company_description || ""}</p>
      <p className="text-gray-600">{companies.company_location || "N/A"}</p>
      <p className="text-gray-600">{companies.company_province || "N/A"}</p>
      <p className="text-gray-600">
        {companies.position_descriptions || "N/A"}
      </p>
      {companies.company_website ? (
        <a
          href={companies.company_website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          Visit Website
        </a>
      ) : (
        <p className="text-gray-600">N/A</p>
      )}
    </div>
  );
};

export default CompanyCard;
