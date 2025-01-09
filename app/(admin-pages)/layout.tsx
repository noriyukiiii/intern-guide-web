"use client";
import React from "react"; // นำเข้า React
import { useSession } from "@/hooks/use-session";
import Sidebar from "./components/sidebar";

type AdminLayoutProp = {
  children: React.ReactNode; // ตรวจสอบให้ children เป็น ReactElement ที่สามารถรับ props user
};

const Authlayout = ({ children }: AdminLayoutProp) => {
  const { session } = useSession();

  // if (!session || session?.user?.role !== "ADMIN") {
  //   return <div>Loading...</div>;  // แสดงหน้าระหว่างที่กำลัง redirect
  // }

  return (
    <div className="min-h-screen flex flex-col mt-20">
      <div className="flex flex-row gap-2">
        <div className="h-screen w-[250px]">
          this is side bar
        </div>
        <div className="mx-8">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Authlayout;
