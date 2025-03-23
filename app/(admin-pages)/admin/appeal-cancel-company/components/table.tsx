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
import { Appeal } from "@/lib/typecancel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CancelTable() {
  const [companyData, setCompanyData] = useState<Appeal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log(companyData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("API BASE URL:", process.env.NEXT_PUBLIC_BASE_RES_API);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_RES_API}/compCreater/cancel`
        );
        setCompanyData(response.data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (
    companyId: string,
    UserId: string,
    appealId: string
  ) => {
    try {
      console.log("CompanyID ", companyId);
      console.log("UserID ", UserId);
      console.log("AppealID ", appealId);
      // เริ่มต้นการส่งคำขอ API
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/compCreater/approve`,
        {
          params: {
            id: appealId, // ไอดีของ company_Student_Interned ที่จะลบ
            compId: companyId, // ไอดีของบริษัท
            userId: UserId, // ไอดีของผู้ใช้
          },
        }
      );

      // ตรวจสอบว่าการตอบกลับสำเร็จ
      if (response.status === 200) {
        toast.success("คำขอยกเลิกดำเนินการเสร็จสิ้น!", {
          autoClose: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        // กรณีที่ไม่ใช่สถานะ 200
        toast.error("เกิดข้อผิดพลาดในคำขอยกเลิก", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      // กรณีที่เกิดข้อผิดพลาดจากการส่งคำขอ
      if (axios.isAxiosError(error)) {
        toast.error(
          `เกิดข้อผิดพลาด: ${error.response?.data?.message || "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้"}`
        );
      } else {
        toast.error("เกิดข้อผิดพลาดในการอนุมัติ");
      }
    }
  };

  const handleReject = async (
    companyId: string,
    UserId: string,
    appealId: string
  ) => {
    try {
      // ส่งค่าผ่าน body ด้วย axios
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/compCreater/reject`,
        {
          id: appealId, // ไอดีของ company_Student_Interned ที่จะลบ
          compId: companyId, // ไอดีของบริษัท
          userId: UserId, // ไอดีของผู้ใช้
        }
      );

      // ตรวจสอบว่าการตอบกลับสำเร็จ
      if (response.status === 200) {
        toast.success("ปฏิเสธคำขอเรียบร้อย!", {
          autoClose: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        // กรณีที่ไม่ใช่สถานะ 200
        toast.error("เกิดข้อผิดพลาดในการปฏิเสธ", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      // กรณีที่เกิดข้อผิดพลาดจากการส่งคำขอ
      if (axios.isAxiosError(error)) {
        toast.error(
          `เกิดข้อผิดพลาด: ${error.response?.data?.message || "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้"}`
        );
      } else {
        toast.error("เกิดข้อผิดพลาดในการปฏิเสธ");
      }
    }
  };

  if (loading)
    return <div className="text-center text-lg text-gray-500">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="w-full  mx-auto p-6 bg-white shadow-lg rounded-lg ">
      <ToastContainer />
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        รายการคำร้องขอของบริษัท
      </h2>

      <div className="overflow-x-auto">
        <Table className="border w-full text-left">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="py-3 px-4">ผู้ยื่นคำขอ</TableHead>
              <TableHead className="py-3 px-4">Company Name</TableHead>
              <TableHead className="py-3 px-4">คำขอ</TableHead>
              <TableHead className="py-3 px-4">Approval Status</TableHead>
              <TableHead className="py-3 px-4 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companyData.length > 0 ? (
              companyData.map((comp) => (
                <TableRow key={comp.id} className="border-b hover:bg-gray-50">
                  <TableCell className="py-3 px-4">
                    {comp.user?.firstName ?? "ไม่ระบุ"}{" "}
                    {comp.user?.lastName ?? ""} <br />
                    <span className="text-gray-500 text-sm">
                      {comp.user?.studentId ?? "-"}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    {comp.company.companyNameTh}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    ยกเลิกการเลือกบริษัท
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        comp.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : comp.status === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {comp.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4 text-center">
                    {comp.status === "pending" && (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() =>
                            handleApprove(
                              comp.company.id,
                              comp.user.id,
                              comp.id
                            )
                          }
                          className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                          ยืนยัน
                        </button>
                        <button
                          onClick={() =>
                            handleReject(comp.company.id, comp.user.id, comp.id)
                          }
                          className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          ปฏิเสธ
                        </button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-gray-600 py-4"
                >
                  ไม่มีคำร้องขอ
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
