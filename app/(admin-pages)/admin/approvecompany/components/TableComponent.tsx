"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import type { CompanyCreator } from "@/lib/types";
import DialogInfo from "./Dialoginfo";
import { ToastContainer } from "react-toastify";

export default function CompanyTable() {
  const [companyData, setCompanyData] = useState<CompanyCreator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("intern-server-noriyukiiii-noriyukiiiis-projects.vercel.app/compCreater");
        setCompanyData(response.data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (companyId: string) => {
    try {
      console.log("test approved");
      await axios.patch(`intern-server-noriyukiiii-noriyukiiiis-projects.vercel.app/company/approve/${companyId}`);
      alert("อนุมัติสถานประกอบการเรียบร้อย!");
      setCompanyData((prev) =>
        prev.map((item) =>
          item.company.id === companyId
            ? {
                ...item,
                company: { ...item.company, approvalStatus: "approved" },
              }
            : item
        )
      );
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการอนุมัติ");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full overflow-x-auto">
      <ToastContainer />
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>ผู้ยื่นคำขอ</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Approval Status</TableHead>
            <TableHead className="text-center">ข้อมูลบริษัท</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companyData.length > 0 ? (
            companyData.map((comp) => (
              <TableRow key={comp.id}>
                <TableCell>
                  {comp.user.firstName} {comp.user.lastName} <br />
                  {comp.user.studentId}
                </TableCell>
                <TableCell>{comp.company.companyNameTh}</TableCell>
                <TableCell>{comp.company.approvalStatus}</TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <DialogInfo companyCreator={comp} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-600 py-4">
                ไม่มีคำร้องขอ
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
