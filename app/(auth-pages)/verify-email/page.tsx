"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const VerifyEmailPage = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmail />
      </Suspense>
    );
  };

function VerifyEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "อีเมลของคุณ";
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResendEmail = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/auth/resend-verification`,
        { email }
      );

      if (response.data.success) {
        setMessage("📧 อีเมลยืนยันถูกส่งอีกครั้ง!");
      } else {
        setMessage("❌ ไม่สามารถส่งอีเมลได้ ลองอีกครั้ง");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FFFAE6] ">
      <div className="bg-white p-16 rounded-lg shadow-md text-center max-w-md ">
        <h1 className="text-2xl font-bold mb-2">📩 ยืนยันอีเมลของคุณ</h1>
        <p className="text-gray-700">
          เราได้ส่งลิงก์ยืนยันไปที่ <br />
          <span className="font-semibold">{email}</span>
        </p>
        <p className="text-gray-600">กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันบัญชี</p>
        <p className="text-gray-600">ใช้เวลา 5 - 15 นาที </p>

        {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}

export default VerifyEmailPage;
