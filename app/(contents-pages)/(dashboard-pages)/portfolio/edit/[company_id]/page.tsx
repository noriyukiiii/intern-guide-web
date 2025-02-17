import { getOptionAction } from "@/actions/optionAction";
import { getAdminCompany } from "@/actions/companyActions";
import EditForm from "./components/edit-form";

type Option = {
  skill: string[];
  tool: string[];
  province: string[];
  position: string[];
  positiondescription: string[];
};

type PageProps = {
  params: Promise<{
    company_id: string;
  }>;
};

const CompanyDetails = async ({ params }: PageProps) => {
  const { company_id } = await params; // Now we need await since params is a Promise

  if (!company_id) {
    console.error("Missing company_id");
    return <div>Missing company ID</div>;
  }

  try {
    // ดึงข้อมูลจาก API
    const company = await getAdminCompany(company_id); // ดึงข้อมูลสถานประกอบการ
    const optionData = await getOptionAction(); // ดึงข้อมูล option

    if (!company || !optionData) {
      console.error("Error fetching data");
      return <div>Error fetching data</div>;
    }

    return (
      <div className="p-4 flex flex-col font-Prompt">
        <div className="flex items-center justify-center my-10">
          <p className="font-bold text-2xl">แก้ไขข้อมูลสถานประกอบการ</p>
        </div>
        <EditForm company={company} optionData={optionData} />
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Error fetching data</div>;
  }
};

export default CompanyDetails;
