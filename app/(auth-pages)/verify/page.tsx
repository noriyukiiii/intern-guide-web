"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailPage />
    </Suspense>
  );
};

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ฟังก์ชันสำหรับการยืนยันอีเมล
  const verifyEmail = async () => {
    if (!token) {
      setMessage("Token is required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_RES_API}/user/verify`, {
        token: token, // ✅ ส่ง token ผ่าน body
      });
      if (response.data.success) {
        setMessage("ยืนยันอีเมลสำเร็จ! กำลังเปลี่ยนหน้า...");
        setTimeout(() => {
          router.push(`/sign-in`);
        }, 2000);
      } else {
        setMessage("❌ ไม่สามารถยืนยันอีเมลได้ ลองอีกครั้ง");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  // ลบ useEffect ที่จะเรียก verifyEmail ทันที
  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FFFAE6]">
      <div className="bg-white p-16 rounded-lg shadow-md text-center max-w-md mb-[500px]">
        <h1 className="text-2xl font-bold mb-2">📩 ยืนยันอีเมลของคุณ</h1>
        <p className="text-gray-700">{loading ? "กำลังยืนยัน..." : message}</p>
        {/* เพิ่มปุ่มให้ผู้ใช้กดยืนยันเอง */}
        {/* <button
          onClick={verifyEmail}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          ยืนยันอีเมล
        </button> */}
      </div>
    </div>
  );
};

export default Page;
