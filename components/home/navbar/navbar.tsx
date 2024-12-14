import Link from "next/link";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-[#002379] py-4 px-10 font-Prompt flex justify-between items-center ">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Image
            src="/logoweb.png"
            alt="Logo"
            width={213}
            height={56}
            className="object-contain"
          />
        </Link>
      </div>

      <ul className="flex gap-[40px]">
        <li>
          <Link href="/" className="text-white hover:text-[#FF5F00] ">
            หน้าหลัก
          </Link>
        </li>
        <li>
          <Link href="/" className="text-white hover:text-[#FF5F00] ">
            บริการ
          </Link>
        </li>
        <li>
          <Link href="/" className="text-white hover:text-[#FF5F00] ">
            คำถามที่พบบ่อย
          </Link>
        </li>
        <li>
          <Link href="/" className="text-white hover:text-[#FF5F00] ">
            Feedback
          </Link>
        </li>
        <li>
          <Link href="/" className="text-white hover:text-[#FF5F00] ">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/" className="text-white hover:text-[#FF5F00]  ">
            <FaRegUserCircle size={24} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
