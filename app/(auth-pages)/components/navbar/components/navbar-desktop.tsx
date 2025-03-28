"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useSession } from "@/hooks/use-session";
import { signOutActions } from "@/actions/auth";

const NavbarDesktop = () => {
  const { session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Force a re-render when session changes
  }, [session]);

  const handleLogout = async () => {
    await signOutActions().then(() => {
      router.push("/sign-in"); // เปลี่ยนไปหน้า login โดยไม่ต้องรีโหลดหน้า
    });
  };

  return (
    <nav className="bg-[#ffffff] w-full h-[85px] py-4 px-6 md:px-10 font-Prompt flex justify-between items-center shadow-md shadow-gray-400 sticky top-0 z-20">
      {/* โลโก้ */}
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Image
            src="/landing/logoweb.svg"
            alt="Logo"
            width={0}
            height={0}
            className="object-contain w-auto h-auto"
          />
        </Link>
      </div>

      {/* เมนู */}
      <ul className="flex gap-[10px] lg:gap-[20px] items-center">
        <li>
          <Link href="/" className="text-[#002379] hover:text-[#FFDE59]">
            หน้าหลัก 
          </Link>
        </li>
        <li>
          <Link
            href="/company-list"
            className="text-[#002379] hover:text-[#FFDE59]"
          >
            รายชื่อสถานประกอบการ
          </Link>
        </li>
        {session?.user?.role === "ADMIN" && (
          <li>
            <Link
              href="/admin/company-list"
              className="text-[#002379] hover:text-[#FFDE59]"
            >
              ADMIN
            </Link>
          </li>
        )}
        {session?.isLoading ? (
          <li>
            <div>กำลังโหลด...</div>
          </li>
        ) : (
          <>
            <p>
              {session.user?.status === "No_Intern" ? (
                <span> สถานะ : ยังไม่เลือกสถานประกอบการ</span>
              ) : null}
            </p>
            <p>
              {session.user?.status === "No_Intern" ? (
                <span> สถานะ : ยังไม่เลือกสถานประกอบการ</span>
              ) : session.user?.status === "Interning" ? (
                <span> สถานะ : กำลังดำเนินการเลือกสถานประกอบการ</span>
              ) : session.user?.status === "InternSuccess" ? (
                <span> สถานะ : เลือกสถานประกอบการแล้ว</span>
              ) : null}
            </p>

            {session?.user ? (
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full overflow-hidden border-1 border-gray-400">
                        <Image
                          src={`${session?.user?.image || "s.png"}`}
                          alt="user image"
                          height={50}
                          width={50}
                          className="object-cover"
                        />
                      </div>
                      <div className="sm:hidden lg:flex flex-col">
                        <span>{session?.user?.firstName ?? ""}</span>
                        <span>{session?.user?.studentId ?? ""}</span>
                      </div>
                      <MdArrowDropDown size={20} />
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
            ) : (
              <li>
                <Link
                  href="/sign-in"
                  className="text-[#002379] hover:text-[#FFDE59]"
                >
                  <FaRegUserCircle size={24} />
                </Link>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavbarDesktop;
