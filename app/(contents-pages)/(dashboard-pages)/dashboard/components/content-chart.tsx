"use client";
import { useEffect, useState } from "react";
import OccupationChart from "./occupation-chart";
import PositionChart from "./position-chart";
import BenefitChart from "./benefit-chart";
import ProvinceChart from "./province-chart";
import { ChartData } from "@/lib/dashboardtype";
import API from "@/lib/axios";
import CompanyTable from "./company-table";

export default function ContentChart() {
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(
    null
  );
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null);
  const [allData, setAllData] = useState<ChartData | null>(null);

  // ✅ โหลดข้อมูลใหม่ทุกครั้งที่เลือกค่า
  useEffect(() => {
    async function fetchData() {
      try {
        const query = new URLSearchParams({
          occupation: selectedOccupation || "",
          position: selectedPosition || "",
          province: selectedProvince || "",
          benefit: selectedBenefit || "",
        }).toString();

        const res = await API.get(
          `http://localhost:5555/company/get_chart?${query}`
        );

        console.log(res.data); // ตรวจสอบข้อมูลที่ได้รับ
        setAllData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
    console.log(allData);
  }, [selectedOccupation, selectedPosition, selectedProvince, selectedBenefit]);
  if (!allData) return <p>Loading...</p>; // ✅ แสดง Loading ก่อนโหลดเสร็จ

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full pb-10">
      <div className="col-span-1 lg:col-span-2 ">
        <div className="text-2xl font-semibold flex justify-center  ">
          <h1 className="m-6 p-6 bg-white shadow-lg rounded-lg ">วิเคราะห์ข้อมูลสถานประกอบการตามความต้องการ</h1>
        </div>
      </div>
      <div className="mt-6 w-full flex justify-end">
        <OccupationChart
          allData={allData}
          onSelect={setSelectedOccupation}
          selected={selectedOccupation}
        />
      </div>
      <div className="mt-6 w-full flex justify-end">
        <PositionChart
          allData={allData}
          onSelect={setSelectedPosition}
          selected={selectedPosition}
        />
      </div>
      <div className="mt-6 w-full flex justify-end">
        <ProvinceChart
          allData={allData}
          onSelect={setSelectedProvince}
          selected={selectedProvince}
        />
      </div>
      <div className="mt-6 w-full flex justify-end ">
        <BenefitChart
          allData={allData}
          onSelect={setSelectedBenefit}
          selected={selectedBenefit}
        />
      </div>
      <div className="col-span-1 md:col-span-2 mt-4">
        <CompanyTable allData={allData.company} />
      </div>
    </div>
  );
}
