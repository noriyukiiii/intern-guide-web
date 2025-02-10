"use server";
import API from "@/lib/axios";
import OccupationChart from "./components/occupation-chart";
import { ChartData } from "@/lib/dashboardtype";
import ContentChart from "./components/content-chart";
import CompanyTable from "./components/company-table";

const Page = async () => {
  const res = await API.get("/company/get_chart");
  const AllData: ChartData = res.data;

  return (
    <div className="flex w-full h-fit bg-gray-100 flex-col">
      <ContentChart allData={AllData} />
      <CompanyTable/>
    </div>
  );
};

export default Page;
