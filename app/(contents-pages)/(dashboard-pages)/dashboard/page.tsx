"use server";
import API from "@/lib/axios";
import OccupationChart from "./components/occupation-chart";
import { ChartData } from "@/lib/dashboardtype";
import ContentChart from "./components/content-chart";


const Page = async () => {
  const res = await API.get("/company/get_chart");
  const AllData: ChartData = res.data;

  return (
    <div className="flex w-full h-fit bg-gray-100">
        <ContentChart allData={AllData} />
    </div>
  );
};

export default Page;
