"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerificationPage = () => {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter(); // ตอนนี้ใช้ได้แล้ว

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const messageParam = urlParams.get("message");
    if (messageParam) {
      setMessage(decodeURIComponent(messageParam)); // แปลงข้อความกลับมาอ่านได้
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">Verification Page</h1>
        {message && (
          <p className="text-center text-gray-700 mb-4">{message}</p>
        )}
        <button
          onClick={() => router.push('/')}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default VerificationPage;
