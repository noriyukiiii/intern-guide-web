//app/componet
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleLogout = async () => {
    startTransition(async () => {
      await signOutActions().then(() => {
        window.location.reload();
      });
    });
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

        {session?.isLoading && <div>loading</div>}

        {session?.user !== null ? (
          <>
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
                <DropdownItem
                  key="profile"
                  onPress={() => router.push("/user-profile")}
                >
                  User Profile
                </DropdownItem>

                <DropdownItem
                  key="edit"
                  onPress={() => router.push("/edit-profile")}
                >
                  Edit Profile
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
