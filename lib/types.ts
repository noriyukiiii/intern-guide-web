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

// Tool interface
export interface Tool {
  id: string;
  name: string;
  skillId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// Skill interface
export interface Skill {
  id: string;
  name: string;
  pos_des_id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  tools: Tool[];
}

// PositionDescription interface
export interface PositionDescription {
  id: string;
  positionId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  skills: Skill[];
}

// Position interface
export interface Position {
  id: string;
  name: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  position_description: PositionDescription[];
}

// Company interface
export interface Company {
  id: string;
  companyNameTh: string;
  companyNameEn: string;
  description: string;
  otherDescription: string | null;
  location: string;
  province: string;
  contractName: string;
  contractTel: string;
  contractEmail: string;
  contractSocial: string;
  contractSocial_line: string;
  establishment: string;
  website: string;
  benefit: string;
  occupation: string;
  imgLink: string | null;
  isMou: boolean;
  approvalStatus: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  positions: Position[];
}

// User interface (สำหรับข้อมูลผู้ใช้)
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  studentId: string;
}

// CompanyCreator (หรือ CompanyCreater) interface สำหรับ record แต่ละตัว
export interface CompanyCreator {
  id: string;
  userId: string;
  companyId: string;
  createdAt: string;
  company: Company;
  user: User;
}
