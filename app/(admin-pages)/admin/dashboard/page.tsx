"use client";
import { useEffect, useState } from "react";
import { AdminDashboardType } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion"; // ใช้ Animation
import {
  BarChart as LucideBarChart,
  Users,
  Building,
  CheckCircle,
  Briefcase,
} from "lucide-react";
import CompanyBarChart from "./components/CompanyBarChart";
import CompanyPieChart from "./components/CompanyPieChart";
import Link from "next/link";

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminDashboardType | null>(null);

  const companyData = [
    { name: "MOU", value: stats?.totalCompanies.mou || 0 },
    { name: "Non-MOU", value: stats?.totalCompanies.nonMou || 0 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_RES_API}/admin/dashboard`
        );
        const data: AdminDashboardType = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats)
    return <p className="text-center text-gray-500 text-xl">Loading...</p>;

  const totalCompanies = stats.totalCompanies.mou + stats.totalCompanies.nonMou;
  const mouPercentage = (
    (stats.totalCompanies.mou / totalCompanies) *
    100
  ).toFixed(2);
  const nonMouPercentage = (
    (stats.totalCompanies.nonMou / totalCompanies) *
    100
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600 p-6 border w-fit mx-auto rounded-xl bg-white shadow-sm">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* สถิติหลัก */}
        <StatCard
          title="นักศึกษาเข้าเลือกบริษัทฝึกงานในปีนี้"
          value={stats.successfulInterns}
          icon={<CheckCircle size={28} className="text-green-500" />}
        />
        <Link href="/admin/user-list">
          <StatCard
            title="ผู้ใช้ทั้งหมด"
            value={stats.totalUsers}
            icon={<Users size={28} className="text-blue-500" />}
          />
        </Link>

        <Link href="/admin/company-list">
          <StatCard
            title="บริษัททั้งหมด"
            value={totalCompanies}
            icon={<Building size={28} className="text-green-500" />}
          />
        </Link>

        <Link href="/admin/approvecompany">
          <StatCard
            title="บริษัทที่รออนุมัติ"
            value={stats.pendingCompanies}
            icon={<CheckCircle size={28} className="text-yellow-500" />}
          />
        </Link>
        <Link href="/admin/appeal-edit-company">
          <StatCard
            title="คำขอแก้ไขบริษัท"
            value={stats.interning}
            icon={<Briefcase size={28} className="text-orange-500" />}
          />
        </Link>
        <Link href="/admin/appeal-cancel-company">
          <StatCard
            title="คำขอยกเลิกการเลือกบริษัท"
            value={stats.totalPositions}
            icon={<Briefcase size={28} className="text-purple-500" />}
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* <CompanyPieChart companyData={companyData} /> */}
        <CompanyBarChart companyData={companyData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* สถิติการฝึกงาน */}
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: JSX.Element;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-semibold">{title}</span>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-700">{value}</p>
    </Card>
  </motion.div>
);

export default AdminDashboard;
