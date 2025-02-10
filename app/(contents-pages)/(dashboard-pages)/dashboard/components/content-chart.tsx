"use client";
import { useEffect, useState } from "react";
import OccupationChart from "./occupation-chart";
import { ChartData } from "@/lib/dashboardtype";
import PositionChart from "./position-chart";
import BenefitChart from "./benefit-chart";
import ProvinceChart from "./province-chart";

export default function ContentChart({ allData }: { allData: ChartData }) {
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(
    null
  );

  useEffect(() => {
    console.log("occuaption : ",selectedOccupation);
  }, [selectedOccupation]); // ✅ ถูกต้องแล้ว

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full pb-10">
      <div className="mt-10 w-full flex justify-end">
        <OccupationChart
          allData={allData}
          onSelect={(selected) => setSelectedOccupation(selected)}
        />
      </div>
      <div className="mt-10 w-full flex justify-end">
        <PositionChart allData={allData} />
      </div>
      <div className="mt-10 w-full flex justify-end">
        <ProvinceChart allData={allData} />
      </div>
      <div className="mt-10 w-full flex justify-end ">
        <BenefitChart allData={allData} />
      </div>
    </div>
  );
}
