"use client";
import React, { useEffect } from "react"; // นำเข้า React
import Navbar from "./components/navbar/navbar";

type ContentLayoutProp = {
  children: React.ReactNode; // ตรวจสอบให้ children เป็น ReactElement ที่สามารถรับ props user
};

const Contentlayout = ({ children }: ContentLayoutProp) => {
  return (
    <div className="min-h-screen flex flex-col gap-1">
      <Navbar />
      <div className="">{children}</div>
    </div>
  );
};

export default Contentlayout;
