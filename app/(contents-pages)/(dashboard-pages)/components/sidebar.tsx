"use client";

import {
  Table,
  LayoutDashboard,
  Bookmark,
  Home,
  List,
  Mail,
  MoreHorizontal,
  User,
  Users,
  ChartPie,
  BellDot,
} from "lucide-react";
import { SidebarDesktop } from "./sidebar-desktop";
import { SidebarItems } from "@/lib/types";
import { SidebarButton } from "./sidebar-button";
import { useMediaQuery } from "usehooks-ts";
import { SidebarMobile } from "./sidebar-mobile";

const sidebarItems: SidebarItems = {
  links: [
    {
      label: "วิเคราะห์สถานประกอบการ",
      href: "/dashboard",
      icon: ChartPie,
    },
    { 
      label: "ข้อมูลผู้ใช้",
      href: "/portfolio",
      icon: User,
    },
    {
      label: "คำร้องขอ",
      href: "/appeal",
      icon: BellDot,
    },
  ],
};

export function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}
