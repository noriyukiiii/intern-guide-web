"use client"
import React, { useEffect } from "react"; // นำเข้า React

type AuthLayoutProp = {
  children: React.ReactNode; // ตรวจสอบให้ children เป็น ReactElement ที่สามารถรับ props user
};

const Authlayout = ({ children }: AuthLayoutProp) => {
  return (
    <div className="min-h-screen flex flex-col gap-1">
      {children}
    </div>
  );
};

export default Authlayout;
