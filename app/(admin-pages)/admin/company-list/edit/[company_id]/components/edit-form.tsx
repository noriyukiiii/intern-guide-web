"use client";
import { useEffect, useState } from "react";

interface CompanyDetails {
  id: string;
  companyNameTh: string;
  companyNameEn: string;
  description: string;
  location: string;
  province: string;
  website: string;
  benefit: string;
  imgLink: string;
  contractEmail: string;
  contractName: string;
  contractSocial: string;
  contractSocial_line: string;
  contractTel: string;
  establishment: string;
  occupation: string;
  otherDescription: string;
  positions: Position[];
}

interface Position {
  id: string;
  name: string;
  position_description: PositionDescription[];
}

interface PositionDescription {
  id: string;
  description: string;
  skills: Skill[];
}

interface Skill {
  id: string;
  name: string;
  tools: Tool[];
}

interface Tool {
  id: string;
  name: string;
}

interface EditFormProps {
  company: CompanyDetails;
}

const EditForm = ({ company }: EditFormProps) => {
  const [formData, setFormData] = useState(company);

  useEffect(() => {
    setFormData(company); // อัปเดตข้อมูลเมื่อได้รับ company ใหม่
  }, [company]);
  return (
    <form>
      <div>
        <label htmlFor="companyNameTh">Company Name (TH):</label>
        <label htmlFor="">{company.companyNameEn}</label>
        <input
          type="text"
          id="companyNameTh"
          name="companyNameTh"
          defaultValue={formData?.companyNameTh || ""} // กำหนดค่าหากไม่มีข้อมูล
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="companyNameEn">Company Name (EN):</label>
        <input
          type="text"
          id="companyNameEn"
          name="companyNameEn"
          defaultValue={formData?.companyNameEn || ""} // กำหนดค่าหากไม่มีข้อมูล
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          defaultValue={formData?.description || ""} // กำหนดค่าหากไม่มีข้อมูล
          className="border p-2 w-full"
        />
      </div>
    </form>
  );
};

export default EditForm;
