"use client"
import React from "react"; // นำเข้า React

type AdminLayoutProp = {
  children: React.ReactNode; // ตรวจสอบให้ children เป็น ReactElement ที่สามารถรับ props user
};

const Authlayout = ({ children }: AdminLayoutProp) => {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  );
};

export default Authlayout;
