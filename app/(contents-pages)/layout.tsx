"use client"
import React, { useEffect } from "react"; // นำเข้า React
import { useSession } from "next-auth/react";

type AuthLayoutProp = {
  children: React.ReactNode; // ตรวจสอบให้ children เป็น ReactElement ที่สามารถรับ props user
};

const Authlayout = ({ children }: AuthLayoutProp) => {

  // if (!sessionCookie || !sessionCookie.value) {
  //   if (typeof window !== "undefined") {
  //     alert("Session หมดอายุ กรุณาเข้าสู่ระบบใหม่");
  //   }
  //   redirect("/");
  // }

  // const session = await decrypt(sessionCookie.value);
  // if (!session) {
  //   if (typeof window !== "undefined") {
  //     alert("Session หมดอายุ กรุณาเข้าสู่ระบบใหม่");
  //   }
  //   redirect("/");
  // }

  // ส่ง props user ให้กับ children ผ่าน React.cloneElement
  return (
    <div className="min-h-screen flex flex-col gap-1">
      {children}
    </div>
  );
};

export default Authlayout;
