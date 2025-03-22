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
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import DataDialog from "./Dialoginfo";

export default function CancelTable() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [companyData, setCompanyData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log(companyData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("API BASE URL:", process.env.NEXT_PUBLIC_BASE_RES_API);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_RES_API}/company/EditRequest`
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

  if (loading)
    return <div className="text-center text-lg text-gray-500">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <>
      <div className="w-full  mx-auto p-6 bg-white shadow-lg rounded-lg ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          รายการคำร้องขอของบริษัท
        </h2>

        <div className="overflow-x-auto">
          <Table className="border w-full text-left">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="py-3 px-4">ผู้ยื่นคำขอ</TableHead>
                <TableHead className="py-3 px-4">Company Name</TableHead>
                <TableHead className="py-3 px-4 text-center">คำขอ</TableHead>
                <TableHead className="py-3 px-4 text-center">
                  Approval Status
                </TableHead>
                <TableHead className="py-3 px-4 text-center">จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companyData.length > 0 ? (
                <>
                  {companyData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="py-3 px-4">
                        {item.user?.firstName ?? "ไม่ระบุ"}{" "}
                        {item.user?.lastName ?? ""} <br />
                        <span className="text-gray-500 text-sm">
                          {item.user?.studentId ?? "-"}
                        </span>
                      </TableCell>
                      <TableCell className="py-2 px-4">
                        {item?.company?.companyNameTh || "ไม่ระบุ"}
                      </TableCell>
                      <TableCell className="py-2 px-4 text-center">
                        คำขอแก้ไขข้อมูลบริษัท
                      </TableCell>
                      <TableCell className="py-3 px-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === "approved"
                              ? "bg-green-100 text-green-600"
                              : item.status === "rejected"
                                ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-2 px-4 text-center">
                        <DataDialog
                          company={item.company}
                          requestData={item.requestData}
                          requestDataId={item.id}
                          user={item.user}
                          open={open}
                          handleClose={handleClose}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
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
    </>
  );
}
