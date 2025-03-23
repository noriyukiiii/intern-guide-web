"use client";

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
import { LogOut, Menu, MoreHorizontal, Settings, X } from "lucide-react";
import Link from "next/link";
import { SidebarButtonSheet as SidebarButton } from "./sidebar-button";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "@/hooks/use-session";
import { signOutActions } from "@/actions/auth";

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}

export function SidebarMobile(props: SidebarMobileProps) {
  const pathname = usePathname();
  const { session } = useSession();
  const handleLogout = async () => {
    try {
      await signOutActions(); // เรียกใช้ signOutActions เมื่อคลิกปุ่ม
      window.location.href = "/sign-in"; // ทำการเปลี่ยนหน้าไปที่หน้าล็อกอิน
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="fixed top-3 left-3">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-3 py-4" hideClose>
        <SheetHeader className="flex flex-row justify-between items-center space-y-0">
          <SheetTitle>ADMIN</SheetTitle>
          <SheetClose asChild>
            <Button className="h-7 w-7 p-0" variant="ghost">
              <X size={15} />
            </Button>
          </SheetClose>
        </SheetHeader>

        {/* <SheetHeader className='flex flex-row justify-between items-center space-y-0'>
          <span className='text-lg font-semibold text-foreground mx-3'>
            ADMIN DASHBOARD
          </span>
          <SheetClose asChild>
            <Button className='h-7 w-7 p-0' variant='ghost'>
              <X size={15} />
            </Button>
          </SheetClose>
        </SheetHeader> */}
        <div className="h-full">
          <div className="mt-5 flex flex-col w-full gap-1">
            {props.sidebarItems.links.map((link, idx) => (
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
            {props.sidebarItems.extras}
          </div>
          <div className="absolute w-full bottom-4 px-1 left-0">
            <Separator className="absolute -top-3 left-0 w-full" />
            <Button variant="ghost" className="w-full justify-start">
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-2">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 border mr-4">
                      <img
                        src={`https://ui-avatars.com/api/?name=${session?.user?.firstName}+${session?.user?.lastName}&background=random&color=fff&length=1&bold=true&font-size=0.40&font=Roboto&format=svg`}
                        alt="user image"
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                  </div>
                  <span>
                    {session?.user?.firstName} {session?.user?.lastName}
                  </span>
                </div>
              </div>
            </Button>
            <SidebarButton
              size="sm"
              icon={LogOut}
              className="w-full "
              onClick={handleLogout}
            >
              Log Out
            </SidebarButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
