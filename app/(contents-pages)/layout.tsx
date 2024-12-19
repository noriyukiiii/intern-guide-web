import React from "react"; // นำเข้า React
import Navbar from "@/components/home/navbar/navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/lib/session"; // ฟังก์ชัน decrypt
import { getUserById } from "@/actions/getuser"; // ฟังก์ชัน getUserById

type AuthLayoutProp = {
  children: React.ReactNode; // ตรวจสอบให้ children เป็น ReactElement ที่สามารถรับ props user
};

const Authlayout = async ({ children }: AuthLayoutProp) => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie || !sessionCookie.value) {
    redirect("/");
  }

  const session = await decrypt(sessionCookie.value);
  if (!session) {
    redirect("/");
  }


  // ส่ง props user ให้กับ children ผ่าน React.cloneElement
  return (
    <div className="min-h-screen flex flex-col gap-1">
      <Navbar />
      {children}
    </div>
  );
};

export default Authlayout;
