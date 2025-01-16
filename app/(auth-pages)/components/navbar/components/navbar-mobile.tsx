import { signOutActions } from "@/actions/auth";
import { SidebarItems } from "@/lib/types";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { LogOut, Menu, X, User, UserPen } from "lucide-react";
import Link from "next/link";
import { SidebarButtonSheet as SidebarButton } from "./sidebar-button";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { Avatar } from "./ui/avatar";
import Image from "next/image";

interface NavbarMobileProps {
  sidebarItems: SidebarItems;
  sessionInfo: {
    firstName: string;
    lastName: string;
    image: string;
    stuId: string;
    role: string;
  };
}

export function NavbarMobile({ sidebarItems, sessionInfo }: NavbarMobileProps) {
  const pathname = usePathname();
  // เพิ่มฟังก์ชัน handleLogout เพื่อให้ทำงานร่วมกับ signOutActions ได้
  const handleLogout = async () => {
    try {
      await signOutActions(); // เรียกใช้ signOutActions เมื่อคลิกปุ่ม
      window.location.href = "/sign-in"; // ทำการเปลี่ยนหน้าไปที่หน้าล็อกอิน
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-[#ffffff] w-full h-[85px] py-4 px-6 md:px-10 font-Prompt flex justify-between items-center shadow-md shadow-gray-400 sticky top-0 z-20">
      {/* โลโก้ด้านซ้าย */}
      <Link href="/">
        <div className="flex items-center">
          <Image
            src="/landing/logoweb.svg" // ใช้ path ที่ถูกต้อง
            alt="Logo"
            width={200} // กำหนดความกว้างที่ต้องการ
            height={140} // กำหนดความสูงที่ต้องการ
            className="object-contain" // หรือใช้ object-cover ขึ้นอยู่กับความต้องการ
          />
        </div>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="fixed right-3">
            <Menu size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-3 py-4" hideClose>
          <SheetHeader className="flex flex-row justify-between items-center space-y-0">
            <SheetTitle>เมนู</SheetTitle>
            <SheetClose asChild>
              <Button className="h-7 w-7 p-0" variant="ghost">
                <X size={15} />
              </Button>
            </SheetClose>
          </SheetHeader>
          <div className="h-full">
            <div className="mt-5 flex flex-col w-full gap-1">
              {sidebarItems.links.map((link, idx) => (
                <Link key={idx} href={link.href}>
                  <SidebarButton
                    variant={pathname === link.href ? "default" : "ghost"}
                    icon={link.icon}
                    className="w-full"
                  >
                    {link.label}
                  </SidebarButton>
                </Link>
              ))}
            </div>
          </div>
          <div className="absolute w-full bottom-4 px-1 left-0">
            {sessionInfo && sessionInfo.firstName !== "Unknown" && (
              <>
                <Separator className="absolute -top-3 left-0 w-full" />
                <div className="w-full px-4 py-2 justify-start">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 border mr-4">
                          <Image
                            src={`${sessionInfo.image || "/userimage/boy.png"}`}
                            alt="user image"
                            height={50}
                            width={50}
                            className="object-cover"
                          />
                        </Avatar>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span>
                          {sessionInfo.firstName} {sessionInfo.lastName}
                        </span>
                        <span>{sessionInfo.stuId}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href="/user-profile">
                  <SidebarButton
                    size="sm"
                    icon={User}
                    className="w-full hover:bg-gray-300"
                  >
                    ข้อมูลผู้ใช้
                  </SidebarButton>
                </Link>
                <Link href="/edit-profile">
                  <SidebarButton
                    size="sm"
                    icon={UserPen}
                    className="w-full hover:bg-gray-300"
                  >
                    แก้ไขข้อมูล
                  </SidebarButton>
                </Link>
                <SidebarButton
                  size="sm"
                  icon={LogOut}
                  className="w-full hover:bg-rose-300"
                  onClick={handleLogout}
                >
                  ลงชื่อออก
                </SidebarButton>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
