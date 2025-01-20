import { getCompany } from "@/actions/admincompanyActions";
import SearchFilter from "./components/searchfilter";

export default async function Page() {
  const companies = await getCompany();
  return (
    <div className="w-full overflow-y-hidden overflow-x-auto">
      <SearchFilter companies={companies} />
    </div>
  );
}

