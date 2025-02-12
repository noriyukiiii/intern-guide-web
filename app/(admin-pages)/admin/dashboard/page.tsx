"use client"
import { useEffect, useState } from "react";
import { AdminDashboardType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, Building, CheckCircle, Briefcase } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminDashboardType | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5555/admin/dashboard");
        const data: AdminDashboardType = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <StatCard title="ผู้ใช้ทั้งหมด" value={stats.totalUsers} icon={<Users size={28} className="text-blue-500" />} />
        <StatCard title="บริษัททั้งหมด" value={stats.totalCompanies.mou + stats.totalCompanies.nonMou} icon={<Building size={28} className="text-green-500" />} />
        <StatCard title="บริษัท (MOU)" value={stats.totalCompanies.mou} icon={<Building size={28} className="text-purple-500" />} />
        <StatCard title="บริษัท (Non-MOU)" value={stats.totalCompanies.nonMou} icon={<Building size={28} className="text-red-500" />} />
        <StatCard title="บริษัทที่รออนุมัติ" value={stats.pendingCompanies} icon={<CheckCircle size={28} className="text-yellow-500" />} />
        <StatCard title="ตำแหน่งฝึกงานทั้งหมด" value={stats.totalPositions} icon={<Briefcase size={28} className="text-indigo-500" />} />
        <StatCard title="นักศึกษาฝึกงานสำเร็จ" value={stats.successfulInterns} icon={<BarChart size={28} className="text-teal-500" />} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }: { title: string; value: number; icon: JSX.Element }) => (
  <Card className="shadow-lg">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold text-gray-700">{value}</p>
    </CardContent>
  </Card>
);

export default AdminDashboard;
