
import { getCompany } from "@/actions/companyActions";
import SearchFilter from "./components/searchFilter";
import { getSession } from "@/lib/auth";
import Footer from "@/components/home/components/footer";

export const revalidate = 0;

export default async function Page() {
  try {
    const session = await getSession();
    const userid = session?.user?.id;
    const companies = await getCompany(userid || "");

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
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error loading companies:', error);
    return (
      <div>
        <h1>Error</h1>
        <p>Failed to load companies</p>
      </div>
    );
  }
}
