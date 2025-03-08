"use server";
// app/(contents-pages)/company-list/[company_id]/page.tsx
import { getCompanyDetails } from "@/actions/getCompanyDetails";
import CompDetail from "./components/comDetail";
import Comment from "./components/Comment";
import { ToastContainer } from "react-toastify";

type PageProps = {
  params: Promise<{
    company_id: string;
  }>;
};

const CompanyDetails = async ({ params }: PageProps) => {
  const { company_id } = await params; // ใช้ await กับ params

  const company = await getCompanyDetails(company_id);

  if (!company) {
    return <p>Company not found</p>;
  }

  return (
    <div className="p-6 bg-gray-50 flex flex-col gap-4">
      <ToastContainer />
      <CompDetail company={company} />
      <Comment companyId={company_id} />
    </div>
  );
};

export default CompanyDetails;
