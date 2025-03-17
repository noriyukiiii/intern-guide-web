"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
type Company = {
  id: string;
  companyNameTh: string;
  companyNameEn: string;
  description: string | null;
  otherDescription: string | null;
  location: string | null;
  province: string | null;
  contractName: string | null;
  contractTel: string | null;
  contractEmail: string | null;
  contractSocial: string | null;
  contractSocial_line: string | null;
  establishment: string | null;
  website: string | null;
  benefit: string | null;
  occupation: string | null;
  imgLink: string | null;
  isMou: boolean | null;
  approvalStatus: string;
  createdAt: string; // or Date, depending on your preference
  updatedAt: string; // or Date
  status: string;
  deletedAt: string | null; // 'null' if not deleted
  positions: Position[]; // Array of positions
};
type Position = {
  companyId: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  name: string;
  updatedAt: string;
};
// คุณไม่จำเป็นต้อง import Company ใหม่ที่นี่เพราะมันถูกประกาศแล้วใน SelectCompany
const SelectCompanyCard = ({
  company,
  userid,
}: {
  company: Company;
  userid: string;
}) => {
  const router = useRouter();
  const handleCompanyClick = () => {
    router.push(`/company-list/${company.id}`);
  };
  const handleCancleCompany = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/company/cancelCompany`,
        {
          userId: userid, // ส่ง userId ไปยัง API
          companyId: company.id, // ส่ง companyId ไปยัง API
        }
      );
      if (response.data.success) {
        toast.success("ยื่นคำขอยกเลิกสถานประกอบการสำเร็จ", {
          position: "top-center", // ระบุตำแหน่งที่แสดง toast
          autoClose: 3000, // ระยะเวลาการแสดง toast
          hideProgressBar: false, // แสดงหรือซ่อน progress bar
          closeOnClick: true, // เมื่อคลิกที่ toast จะปิด
          pauseOnHover: true, // เมื่อ hover จะหยุดการนับเวลา
          draggable: true, // ให้สามารถลาก toast ได้
          progress: undefined, // ใช้ค่าที่กำหนดเองสำหรับ progress
          theme: "light", // เลือกธีมสำหรับ toast
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.error("เกิดข้อผิดพลาดในการยกเลิกสถานประกอบการ", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark", // ใช้ธีมมืดสำหรับข้อผิดพลาด
        });
      }
    } catch (error) {
      console.error("Error cancelling company:", error);
      toast.error("เกิดข้อผิดพลาดในการติดต่อ API", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <CardTitle
          className="text-lg font-semibold hover:text-blue-500 hover:cursor-pointer"
          onClick={handleCompanyClick}
        >
          {company.companyNameTh} ({company.companyNameEn})
        </CardTitle>
        <div className="flex flex-col">
          <div className="flex flex-col flex-1">
            <div className="text-md">
              <span>สายการเรียน : </span>
              {company.occupation === "No_Info"
                ? "ไม่มีข้อมูล"
                : company.occupation === "Network"
                  ? "Network"
                  : company.occupation === "database"
                    ? "Database"
                    : company.occupation === "both"
                      ? "ทั้งสองสาย"
                      : company.occupation}{" "}
              | ตำแหน่ง :{" "}
              {company.positions.map((position: { name: string }, idx) => (
                <span key={idx}>
                  {position.name === "Unknown" ? "ไม่มีข้อมูล" : position.name}
                  {idx < company.positions.length - 1 ? ", " : ""}
                </span>
              ))}
              <br />
              สวัสดิการ : {company.benefit ? "มีสวัสดิการ" : "ไม่มีข้อมูล"} |
              จังหวัด : {company.province}
              <div>ที่ตั้ง : {company.location} </div>
            </div>
          </div>
          <div className="flex flex-col force-row justify-start items-center gap-2 mt-6">
            <Button
              className={`${
                company.status === "pending"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-rose-500 hover:bg-rose-600"
              }`}
              onClick={handleCancleCompany}
              disabled={company.status === "pending"}
            >
              {company.status === "pending"
                ? "คำขออยู่ยกเลิกระหว่างพิจารณา"
                : "ยกเลิกสถานประกอบการนี้"}
            </Button>
            <Button
              onClick={() => router.push(`/portfolio/edit/${company.id}`)}
            >
              แก้ไขข้อมูลบริษัท
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectCompanyCard;
