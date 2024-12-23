"use client";

import Link from "next/link";
import Image from "next/image";

import { FaRegUserCircle } from "react-icons/fa";
import { 
   signOut,
   useSession
} from "next-auth/react";

export default function Navbar() {
   const { data, status } = useSession();

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
               <Link
                  href="/testpage"
                  className="text-[#002379] hover:text-[#FFDE59] "
               >
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

            {/* แสดงเฉพาะเมื่อมีการล็อกอิน */}
            {status === "authenticated" && data ? (
               <>
                  <li className="flex items-center">
                     <FaRegUserCircle size={24} className="mr-2" />
                     <span>{data.user.firstName ?? ""} {data.user.lastName ?? ""}</span>
                  </li>
                  <li>
                     <button
                        onClick={() => signOut()}
                        className="text-[#002379] hover:text-[#FFDE59] flex items-center"
                     >
                        Logout
                     </button>
                  </li>
               </>
            ) : (
               <li>
                  <Link
                     href="/sign-in"
                     className="text-[#002379] hover:text-[#FFDE59] "
                  >
                     <FaRegUserCircle size={24} />
                  </Link>
               </li>
            )}
         </ul>
      </nav>
   );
}
