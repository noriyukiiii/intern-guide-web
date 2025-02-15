"use client";

import { SidebarButton } from "./sidebar-button";
import { SidebarItems } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";


interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
  const pathname = usePathname();

  return (
    <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-0 border-r pt-[85px]">
      <div className="h-full px-3 py-4">
        <h3 className="mx-3 text-lg font-semibold text-foreground">
          ข้อมูลสถานประกอบการ
        </h3>
        <div className="mt-5">
          <div className="flex flex-col gap-1 w-full">
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
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
        </div>
      </div>
    </aside>
  );
}
