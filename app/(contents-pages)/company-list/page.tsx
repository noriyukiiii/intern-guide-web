// "use client";
import { getCompany } from "@/actions/companyActions";
import SearchFilter from "./components/searchFilter";

export default async function Page() {
  const companies = await getCompany();

  if (!companies) {
    return (
      <div>
        <h1>Company List</h1>
        <p>No companies found.</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Company List</h1>
      <SearchFilter companies={companies} />
    </div>
  );
}
