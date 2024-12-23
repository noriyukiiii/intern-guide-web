"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface User {
  user_id: string;
  email: string;
  firstname: string;
  lastname: string;
  student_id: string;
  telephone: string;
  role: string;
}

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ตรวจสอบสถานะล็อกอิน
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkCookie = async () => {
      try {
        // เรียก API เพื่อตรวจสอบคุกกี้
        const response = await fetch("/api/checkcookie");
        const result = await response.json();

        if (result.valid) {
          setIsLoggedIn(true);
          const userResponse = await fetch("/api/session");
          const userData = await userResponse.json();
          setUser(userData); // ตั้งค่าผู้ใช้
        } else {
          setIsLoggedIn(false);
          setUser(null); // ถ้าไม่ล็อกอิน ให้ลบข้อมูลผู้ใช้
        }
      } catch (error) {
        console.error("Error checking cookie:", error);
        setIsLoggedIn(false);
      }
    };

    checkCookie();
  }, []); // ใช้ empty dependency array เพื่อเรียกใช้เพียงครั้งเดียวเมื่อโหลดหน้า

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        console.log("Logged out successfully");
        setIsLoggedIn(false);
        setUser(null); // ล้างข้อมูลผู้ใช้
        router.push("/sign-in"); // ไปที่หน้า sign-in
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-[#ffffff] py-4 px-10 font-Prompt flex justify-between items-center shadow-md shadow-gray-400">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Image
            src="/landing/logoweb.svg"
            alt="Logo"
            width={213}
            height={56}
            className="object-contain"
          />
        </Link>
      </div>

      <ul className="flex gap-[40px]">
        <li>
          <Link href="/" className="text-[#002379] hover:text-[#FFDE59] ">
            หน้าหลัก
          </Link>
        </li>
        <li>
          <Link href="/testpage" className="text-[#002379] hover:text-[#FFDE59] ">
            บริการ
          </Link>
        </li>
        <li>
          <Link href="/" className="text-[#002379] hover:text-[#FFDE59] ">
            คำถามที่พบบ่อย
          </Link>
        </li>
        <li>
          <Link href="/" className="text-[#002379] hover:text-[#FFDE59] ">
            Feedback
          </Link>
        </li>
        <li>
          <Link href="/" className="text-[#002379] hover:text-[#FFDE59] ">
            Dashboard
          </Link>
        </li>
        <li>
        <button
                onClick={handleLogout}
                className="text-[#002379] hover:text-[#FFDE59] flex items-center"
              >
                Logout
              </button>
        </li>

        {/* แสดงเฉพาะเมื่อมีการล็อกอิน */}
        {isLoggedIn && user ? (
          <>
            <li className="flex items-center">
              <FaRegUserCircle size={24} className="mr-2" />
              <span>{user.firstname} {user.lastname}</span>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-[#002379] hover:text-[#FFDE59] flex items-center"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in" className="text-[#002379] hover:text-[#FFDE59] ">
              <FaRegUserCircle size={24} />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
