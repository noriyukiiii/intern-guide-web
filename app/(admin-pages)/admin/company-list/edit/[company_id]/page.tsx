"use server";
// app/(contents-pages)/company-list/[company_id]/page.tsx
import EditForm from "./components/edit-form";

// ใช้ type สำหรับ company
type Tool = {
  id: string;
  name: string;
};

type Skill = {
  id: string;
  name: string;
  tools: Tool[];
};

type PositionDescription = {
  id: string;
  description: string;
  skills: Skill[];
};

type Position = {
  id: string;
  name: string;
  position_description: PositionDescription[];
};

type Company = {
  id: string;
  companyNameTh: string;
  companyNameEn: string;
  description: string;
  address: string;
  website: string;
  phone: string;
  contractName: string;
  contractEmail: string;
  contractTel: string;
  contractSocial: string;
  contractSocialLine: string;
  imgLink: string;
  location: string;
  occupation: string;
  positions: Position[];
};

const CompanyDetails = async ({
  params,
}: {
  params: { company_id: string };
}) => {
  const { company_id } = await params;

  // ดึงข้อมูลจาก API โดยตรง
  const response = await fetch(`http://localhost:5555/company/${company_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store", // เพื่อให้ดึงข้อมูลใหม่ทุกครั้ง
  });

  if (!response.ok) {
    console.error("Error fetching company details:", response.statusText);
    return (
      <div className="w-full h-full text-center pt-10">
        <p className="font-bold text-lg text-red-500">Company not found</p>
      </div>
    );
  }

  const company : Company = await response.json(); // ใช้ type ที่กำหนด
  console.log(company);
  return (
    <div className="p-4">
      <div className="bg-black w-fit text-white p-4">
        CompanyName : {company.companyNameEn}
      </div>
      
      {/* <EditForm company={company} /> */}
    </div>
  );
};

export default CompanyDetails;
