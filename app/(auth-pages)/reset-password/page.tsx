"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPassword() {
   const searchParams = useSearchParams();
   const token = searchParams.get("token");
   const [newPassword, setNewPassword] = useState("");
   const [message, setMessage] = useState("");

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5555/auth/reset-password", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      setMessage(data.message);
   };

   return (
      <div className="flex flex-col items-center justify-center h-screen">
         <h1 className="text-2xl font-bold">รีเซ็ตรหัสผ่าน</h1>
         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
               type="password"
               placeholder="รหัสผ่านใหม่"
               value={newPassword}
               onChange={(e) => setNewPassword(e.target.value)}
               className="border p-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2">เปลี่ยนรหัสผ่าน</button>
         </form>
         {message && <p className="text-red-500">{message}</p>}
      </div>
   );
}
