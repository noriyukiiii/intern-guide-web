"use client";
import React from "react"; // นำเข้า React
import { useSession } from "@/hooks/use-session";
import Navbar from "./components/navbar";
import { Sidebar } from "./components/sidebar";

type AdminLayoutProp = {
  children: React.ReactNode; // ตรวจสอบให้ children เป็น ReactElement ที่สามารถรับ props user
};

const Adminlayout = ({ children }: AdminLayoutProp) => {
  const { session } = useSession();

  return (
    <div className="">
      <Sidebar />
      <main className="mx-5 mt-0 sm:ml-[300px] sm:mt-3 font-Prompt">{children}</main>
    </div>
  );
};

export default Adminlayout;
