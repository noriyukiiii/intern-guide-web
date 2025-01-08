"use client";

import { useState } from "react";
import CompanyCard from "./companyCard";

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
    position_names: string;
    position_descriptions: string | null;
    skill_names: string;
    tools_names: string;
  }[];
}
const SearchFilter = ({ companies }: CompanyCardProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies = companies.filter((company) => {
    const normalize = (str : string) => str?.replace(/\s+/g, "").toLowerCase(); // ลบช่องว่างและแปลงเป็นตัวพิมพ์เล็ก
    const normalizedSearch = normalize(searchTerm); // Normalize คำค้นหา
  
    return (
      normalize(company.company_name_th).includes(normalizedSearch) ||
      normalize(company.company_name_en).includes(normalizedSearch) ||
      (company.company_location && normalize(company.company_location).includes(normalizedSearch))
    );
  });

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a company..."
        className="border p-2 rounded w-full mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.company_id} companies={company} />
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
