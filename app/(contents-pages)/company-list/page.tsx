"use server";
import { getCompany } from "@/actions/companyActions";
import SearchFilter from "./components/searchFilter";
import { getSession } from "@/lib/auth";

export default async function Page() {
  const session = await getSession();

  const userid = session?.user?.id;
  const companies = await getCompany(userid || "");
  //ต้องแก้ defaultvalue User
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
      <SearchFilter companies={companies} />
    </div>
  );
}
