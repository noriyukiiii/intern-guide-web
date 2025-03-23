"use client";

import { Table, Home, BriefcaseBusiness } from "lucide-react";
import NavbarDesktop from "./navbar-desktop";
import { SidebarItems } from "@/lib/types";

import { useMediaQuery } from "usehooks-ts";
import { NavbarMobile } from "./navbar-mobile";
import { useSession } from "@/hooks/use-session";

export function NavbarMain() {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });
  const { session } = useSession(); // Get session data

  const sidebarItems: SidebarItems = {
    links: [
      { label: "หน้าหลัก", href: "/", icon: Home },
      { label: "ADMIN", href: "/admin/dashboard", icon: Home },
      { label: "รายชื่อสถานประกอบการ", href: "/company-list", icon: Home },
      { label: "วิเคราะห์ข้อมูลสถานประกอบการ", href: "/dashboard", icon: Home },
      { label: "คำร้องขอ", href: "/appeal", icon: Home },
      { label: "เข้าสู่ระบบ", href: "/sign-in", icon: Table },
    ]
      .filter((item) => {
        if (session?.user?.role === "ADMIN") {
          // If user is ADMIN, show all items
          return true;
        } else {
          return !["ADMIN"].includes(item.label);
        }
      })
      .filter((item) => item.label !== "เข้าสู่ระบบ" || !session?.user), // Hide "เข้าสู่ระบบ" if user is logged in
  };
  // ส่งข้อมูล session เช่น firstName ไปที่ NavbarMobile
  const sessionInfo = {
    firstName: session?.user?.firstName || "Unknown", // กำหนดค่าหากไม่มีค่า
    lastName: session?.user?.lastName || "Unknown",
    image: session?.user?.image || "/userimage/boy.png", // ใช้ค่า default หากไม่มีภาพ
    stuId: session?.user?.studentId || "Not Available",
    role: session?.user?.role || "MEMBER", // กำหนดค่า default เป็น MEMBER หากไม่มี role
  };

  if (isDesktop) {
    return (
      <div className="mb-[85px]">
        <NavbarDesktop />
      </div>
    );
  }

  return <NavbarMobile sidebarItems={sidebarItems} sessionInfo={sessionInfo} />;
}
