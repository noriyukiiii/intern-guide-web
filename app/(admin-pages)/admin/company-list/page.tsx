import { getCompany } from "@/actions/companyActions";
import Table from "./components/table";

export default async function Page() {
  const companies = await getCompany();

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-auto">
      <Table companies={companies} />
    </div>
  );
}

