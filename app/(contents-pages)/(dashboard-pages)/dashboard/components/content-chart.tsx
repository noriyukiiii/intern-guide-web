"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import OccupationChart from "./occupation-chart";
import PositionChart from "./position-chart";
import BenefitChart from "./benefit-chart";
import ProvinceChart from "./province-chart";
import { ChartData } from "@/lib/dashboardtype";
import API from "@/lib/axios";
import CompanyTable from "./company-table";
import { useSession } from "@/hooks/use-session";
import "./content.css";

export default function ContentChartPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContentChart />
    </Suspense>
  );
}

function ContentChart() {
  const { session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // ค่าที่เลือก (อัปเดตตาม URL params)
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null);
  const [allData, setAllData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ดึงค่าจาก URL params ทุกครั้งที่เปลี่ยน
  useEffect(() => {
    setSelectedOccupation(searchParams.get("occupation"));
    setSelectedPosition(searchParams.get("position"));
    setSelectedProvince(searchParams.get("province"));
    setSelectedBenefit(searchParams.get("benefit"));
  }, [searchParams]); // ✅ URL เปลี่ยน ค่าจะอัปเดตอัตโนมัติ

  const updateSearchParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(window.location.search);
  
    // Set or delete the parameter based on the value
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  
    // Use replace to update the URL without causing a page reload
    window.history.pushState(null, '', `${pathname}?${params.toString()}`);
  };

  // Fetch data
  useEffect(() => {
    if (!session.user?.id) return;

    setIsLoading(true);
    async function fetchData() {
      try {
        const query = new URLSearchParams({
          occupation: selectedOccupation || "",
          position: selectedPosition || "",
          province: selectedProvince || "",
          benefit: selectedBenefit || "",
          userId: session.user?.id || "",
        }).toString();

        const res = await API.get(`/company/get_chart?${query}`);
        setAllData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [
    selectedOccupation,
    selectedPosition,
    selectedProvince,
    selectedBenefit,
    session.user?.id,
  ]);

  if (!session.user?.id)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );

  // Provide a proper fallback if allData is null
  const safeAllData: ChartData = allData || {
    occupation: { default: 0 },
    position: { default: 0 },
    benefit: { default: 0 },
    province: { default: 0 },
    company: [],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full pb-10">
      <div className="col-span-1 lg:col-span-2">
        <div className="text-2xl font-semibold flex justify-center">
          <h1 className="m-6 p-6 bg-white shadow-lg rounded-lg">
            วิเคราะห์ข้อมูลสถานประกอบการตามความต้องการ
          </h1>
        </div>
      </div>
      <div className="mt-6 w-full flex justify-end">
        <OccupationChart
          allData={safeAllData}
          onSelect={(value) => updateSearchParams("occupation", value)}
          selected={selectedOccupation}
        />
      </div>
      <div className="mt-6 w-full flex justify-end">
        <PositionChart
          allData={safeAllData}
          onSelect={(value) => updateSearchParams("position", value)}
          selected={selectedPosition}
        />
      </div>
      <div className="mt-6 w-full flex justify-end">
        <ProvinceChart
          allData={safeAllData}
          onSelect={(value) => updateSearchParams("province", value)}
          selected={selectedProvince}
        />
      </div>
      <div className="mt-6 w-full flex justify-end">
        <BenefitChart
          allData={safeAllData}
          onSelect={(value) => updateSearchParams("benefit", value)}
          selected={selectedBenefit}
        />
      </div>
      <div className="col-span-1 md:col-span-2 mt-4">
        <CompanyTable allData={safeAllData.company} user={session.user?.id} />
      </div>
    </div>
  );
}
