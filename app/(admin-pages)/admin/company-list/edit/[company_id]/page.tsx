import { getOptionAction } from "@/actions/optionAction";
import EditForm from "./components/edit-form";
import { getAdminCompany } from "@/actions/companyActions";
import HelloTest from "./components/test";



type Option = {
  skill: string[];
  tool: string[];
  province: string[];
  position: string[];
  positiondescription: string[];
};

const CompanyDetails = async ({
  params,
}: {
  params: { company_id: string };
}) => {
  const { company_id } = await params;

  const company = await getAdminCompany(company_id);

  // Fetch option data
  const optionData: Option = await getOptionAction();


  return (
    <div className="p-4 flex flex-col">
      <EditForm company={company} optionData={optionData} />
    </div>
  );
};

export default CompanyDetails;
