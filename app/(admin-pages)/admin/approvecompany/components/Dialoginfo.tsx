"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area"; // นำเข้า ScrollArea
import { CompanyCreator } from "@/lib/types"; // ปรับ path ให้ตรงกับที่คุณเก็บ interface ไว้
import { Check, X as Xicon } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
interface DialogInfoProps {
  companyCreator: CompanyCreator;
}

const DialogInfo: React.FC<DialogInfoProps> = ({ companyCreator }) => {
  const { company } = companyCreator;
  const compId = company.id;

  const handleApprove = async () => {
    try {
      // เริ่มต้นการส่งคำขอ API
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/admin/approve/${compId}`
      );

      // ตรวจสอบว่าการตอบกลับสำเร็จ
      if (response.status === 200) {
        toast.success("อนุมัติสถานประกอบการเรียบร้อย!", {
          autoClose: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        // กรณีที่ไม่ใช่สถานะ 200
        toast.error("เกิดข้อผิดพลาดในการอนุมัติ", {
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
  const handleReject = async () => {
    try {
      // เริ่มต้นการส่งคำขอ API
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/admin/reject/${compId}`
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
        toast.error("เกิดข้อผิดพลาดในการอนุมัติ", {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-sky-400 text-black">
          ดูรายละเอียด
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold font-Prompt">
            รายละเอียดบริษัท
          </DialogTitle>
        </DialogHeader>
        {/* ใช้ ScrollArea ครอบเนื้อหาทั้งหมด */}
        <ScrollArea className="h-[75vh] border pr-4 p-4 rounded-lg bg-white shadow-sm">
          <div className="font-Prompt">
            {/* Logo */}
            <div className="flex justify-center w-full">
              <img
                src={company.imgLink || "/company_image/noimage.png"}
                alt="Company Logo"
                className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="mt-4">
              <h3 className="font-bold w-full truncate">
                {company.companyNameTh} ( {company.companyNameEn} )
              </h3>
            </div>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p>สวัสดิการ : {company.benefit}</p>
                <p>ที่อยู่ : {company.location}</p>
                <p>สายการเรียน : {company.occupation}</p>
                <div className="flex gap-2 items-center">
                  <p>เว็บไซต์ :</p>
                  <a
                    className="text-blue-400 truncate w-40 md:w-auto"
                    href={company.website}
                    target="_blank"
                  >
                    เข้าชมเว็บไซต์
                  </a>
                </div>
                <p className=" flex items-center">
                  MOU :{" "}
                  {company.isMou ? (
                    <Check color="green" />
                  ) : (
                    <Xicon color="red" />
                  )}
                </p>
              </div>

              <div>
                <p>ชื่อบุคคลติดต่อ : {company.contractName}</p>
                <p>เบอร์โทร : {company.contractTel}</p>
                <p>อีเมล : {company.contractEmail}</p>
                <p className="w-full truncate">
                  Social : {company.contractSocial}
                </p>
                <p>Line : {company.contractSocial_line}</p>
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <p>คำอธิบาย : </p>
                <div className="w-full break-words">{company.description}</div>
              </div>
            </div>

            {/* Website Link */}

            {/* MOU Status */}
          </div>

          {/* รายละเอียดตำแหน่งงาน */}
          <div className="mt-6">
            {company.positions && company.positions.length > 0 ? (
              <div className="space-y-4 mt-2">
                {company.positions.map((position) => (
                  <div
                    key={position.id}
                    className="border rounded p-4 bg-gray-50 shadow-sm"
                  >
                    <h3 className="text-xl font-semibold">ตำแหน่ง :</h3>

                    {position.position_description &&
                    position.position_description.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 ml-4">
                        {position.position_description.map((desc) => (
                          <div key={desc.id} className="border-l pl-4">
                            <h4 className="font-semibold">รายละเอียดตำแหน่ง</h4>
                            <p> - {desc.description}</p>

                            {desc.skills && desc.skills.length > 0 && (
                              <div className="mt-1 ml-4">
                                <h5 className="font-semibold">ทักษะ :</h5>
                                {desc.skills.map((skill) => (
                                  <div key={skill.id} className="mt-1">
                                    <p>- {skill.name}</p>
                                    <h5 className="font-semibold">
                                      เครื่องมือ :
                                    </h5>
                                    {skill.tools && skill.tools.length > 0 && (
                                      <ul className="list-disc list-inside ml-4">
                                        {skill.tools.map((tool) => (
                                          <li key={tool.id} className="mt-1">
                                            {tool.name}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 ml-4 text-gray-600">
                        ไม่มีรายละเอียดตำแหน่ง
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-gray-600">ไม่มีข้อมูลตำแหน่งงาน</p>
            )}
          </div>
        </ScrollArea>

        {/* ปุ่มปิด */}
        <DialogFooter className="mt-6">
          <Button
            variant="default"
            className="bg-red-500"
            onClick={handleReject}
          >
            ปฏิเสธ
          </Button>
          <Button
            variant="default"
            className="bg-green-500"
            onClick={handleApprove}
          >
            ตอบรับ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogInfo;
