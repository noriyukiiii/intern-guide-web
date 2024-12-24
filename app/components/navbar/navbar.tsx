//app/componet
"use client";

import { useTransition } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useSession } from "@/hooks/use-session";
import { signOutActions } from "@/actions/auth";

export default function Navbar() {
  const [isPending, startTransition] = useTransition();
  const { session } = useSession();
  
  const handleLogout = async () => {
    startTransition(async () => {
      await signOutActions().then(() => {
        window.location.reload();
      });
    });
  }


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

      <ul className="flex gap-[40px] items-center">
        <li>
          <Link href="/" className="text-[#002379] hover:text-[#FFDE59]">
            หน้าหลัก
          </Link>
        </li>
        <li>
          <Link
            href="/testpage"
            className="text-[#002379] hover:text-[#FFDE59] "
          >
            รายชื่อสถานประกอบการ
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
        {session?.user !== null ? (
          <>
            {/* <details className="dropdown">
              <summary className="btn m-1">open or close</summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li>
                  <Link href='/sign-in'>test</Link>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </details> */}

            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-8 w-8 rounded-full border-1 border-gray-400">
                      <Image
                        src="/landing/witch.png"
                        alt=""
                        height={50}
                        width={50}
                      />
                    </div>
                    <div className="flex">
                      <span>{session?.user?.firstName ?? ""}</span>
                      <span className="text-black flex items-center">
                        <MdArrowDropDown size={20} />
                      </span>
                    </div>
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User Menu">
                <DropdownItem key="profile">
                  <Link href="/user-profile">User Profile</Link>
                </DropdownItem>
                <DropdownItem key="edit">
                  <Link href="/edit-profile">Edit Profile</Link>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={handleLogout}
                >
                  Log out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* <li className="flex items-center">
              <FaRegUserCircle size={24} className="mr-2" /> */}
            {/* <span>
              {data.user.firstName ?? ""} {data.user.lastName ?? ""}
            </span> */}
            {/* </li> */}
            {/* <li>
              <button
                onClick={() => signOut()}
                className="text-[#002379] hover:text-[#FFDE59] flex items-center"
              >
                Logout
              </button>
            </li> */}
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
