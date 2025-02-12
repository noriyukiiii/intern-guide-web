import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon;
  }>;
  extras?: ReactNode;
}

export interface AdminDashboardType {
  totalUsers: number;
  totalCompanies: {
    company: number;
    mou: number;
    nonMou: number;
  };
  pendingCompanies: number;
  totalPositions: number;
  interning: number;
  successfulInterns: number;
}
