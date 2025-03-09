"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("intern-server-noriyukiiii-noriyukiiiis-projects.vercel.app/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();
    setMessage(data.message);

    // ถ้าการรีเซ็ตรหัสผ่านสำเร็จ ให้ไปที่หน้า Login
    if (data.success) {
      // แนะนำให้ใช้ useRouter เพื่อไปที่หน้า login
      setTimeout(() => {
        router.push("/login");
      }, 1000); // รอ 1 วินาทีก่อนไปหน้า Login
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FFFAE6] p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 items-center w-full max-w-md p-8 bg-white rounded-3xl shadow-lg"
      >
        <h1 className="text-2xl font-bold">รีเซ็ตรหัสผ่าน</h1>
        <p className="text-sm text-gray-500 text-center">
          กรุณากรอกรหัสผ่านใหม่เพื่อรีเซ็ตรหัสผ่านของคุณ
        </p>

        <div className="w-full">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            รหัสผ่านใหม่
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="รหัสผ่านใหม่"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl mt-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#095890] rounded-xl px-4 py-4 text-white w-full"
        >
          เปลี่ยนรหัสผ่าน
        </button>

        {message && <p className="text-red-500 text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
