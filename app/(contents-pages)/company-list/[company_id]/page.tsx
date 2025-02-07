// app/(contents-pages)/company-list/[company_id]/page.tsx
import { getCompanyDetails } from "@/actions/getCompanyDetails";
// import noimage from "./assets/noimage.png";
import CompDetail from "./components/comDetail";

type PageProps = {
  params: Promise<{
    company_id: string;
  }>;
};

const CompanyDetails = async ({ params }: PageProps) => {
  const { company_id } = await params; // ใช้ await กับ params
  const company = await getCompanyDetails(company_id);
  console.log(company);
  if (!company) {
    return <p>Company not found</p>;
  }

  return (
    <div className="p-6">
      <CompDetail company={company} />
    </div>
  );
};

export default CompanyDetails;
