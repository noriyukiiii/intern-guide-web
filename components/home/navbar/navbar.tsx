import Link from "next/link";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";

export default function Navbar() {  
  return (
    <nav className="bg-[#ffffff] py-4 px-10 font-Prompt flex justify-between items-center shadow-sm shadow-gray-400 ">
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
          <Link href="/" className="text-[#002379] hover:text-[#FFDE59] ">
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
          <Link href="/" className="text-[#002379] hover:text-[#FFDE59]  ">
            <FaRegUserCircle size={24} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
