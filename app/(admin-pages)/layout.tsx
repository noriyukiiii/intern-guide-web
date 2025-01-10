"use client";
import React from "react"; // นำเข้า React
import { useSession } from "@/hooks/use-session";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

type AdminLayoutProp = {
  children: React.ReactNode; // ตรวจสอบให้ children เป็น ReactElement ที่สามารถรับ props user
};

const Authlayout = ({ children }: AdminLayoutProp) => {
  const { session } = useSession();



  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="pt-[80px] pl-[80px] h-screen w-screen overflow-y-hidden">
        {children}
      </main>
    </>
  );
};

export default Authlayout;
