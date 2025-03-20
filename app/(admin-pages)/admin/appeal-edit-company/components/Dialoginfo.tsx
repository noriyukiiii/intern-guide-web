"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, XIcon } from "lucide-react";
import axios from "axios";
import { Data } from "@/lib/types";
import { toast } from "react-toastify";
// Interface สำหรับแต่ละตำแหน่งงาน

const DataDialog = ({
  company,
  requestData,
  requestDataId,
  user,
  open,
  handleClose,
}: Data) => {
  const handleApprove = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/company/confirmEdit`,
        {
          requestId: requestDataId, // ส่ง requestDataId ที่ได้รับเป็น prop
          compId: company.id,
          userId: user.id,
        }
      );
      toast.success("อนุมัติสถานประกอบการเรียบร้อย!", {
        autoClose: 2000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);

      console.log(response.data); // ตรวจสอบคำตอบจากเซิร์ฟเวอร์
    } catch (error) {
      console.error("Error during approve:", error);
    }
  };
  const handleReject = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/company/rejectEdit`,
        {
          requestId: requestDataId, // ส่ง requestDataId ที่ได้รับเป็น prop
          compId: company.id,
          userId: user.id,
        }
      );
      toast.success("ปฏิเสธการแก้ไขสถานประกอบการเรียบร้อย!", {
        autoClose: 2000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);

      console.log(response.data); // ตรวจสอบคำตอบจากเซิร์ฟเวอร์
    } catch (error) {
      console.error("Error during approve:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-sky-400 text-black">
          ดูรายละเอียด
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold font-Prompt">
            รายละเอียดบริษัท
          </DialogTitle>
        </DialogHeader>
        {/* ใช้ ScrollArea ครอบเนื้อหาทั้งหมด */}
        <div className="grid grid-cols-2 gap-4">
          <ScrollArea className="h-[80vh] border pr-4 p-4 rounded-lg bg-white shadow-sm">
            <div className="font-Prompt">
              {/* Logo */}
              <div className="flex justify-center w-full p-2 text-xl">
                <span className="inline-flex items-center justify-center px-4 py-1 text-xl font-Sarabun  text-white bg-blue-500 rounded-full">
                  ปัจจุบัน
                </span>
              </div>
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
                      <XIcon color="red" />
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
                  <div className="w-full break-words">
                    {company.description}
                  </div>
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
                              <h4 className="font-semibold">
                                รายละเอียดตำแหน่ง
                              </h4>
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
                                      {skill.tools &&
                                        skill.tools.length > 0 && (
                                          <ul className="list-disc list-inside ml-4">
                                            {skill.tools.map((tool) => (
                                              <li
                                                key={tool.id}
                                                className="mt-1"
                                              >
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
          <ScrollArea className="h-[80vh] border pr-4 p-4 rounded-lg bg-white shadow-sm">
            <div className="font-Prompt">
              {/* Logo */}
              <div className="flex justify-center w-full p-2 text-xl">
                <span className="inline-flex items-center justify-center px-4 py-1 text-xl font-Sarabun  text-white bg-red-500 rounded-full">
                  แก้ไข
                </span>
              </div>
              <div className="flex justify-center w-full">
                <img
                  src={requestData.imgLink || "/company_image/noimage.png"}
                  alt="Company Logo"
                  className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-bold w-full truncate">
                  {requestData.companyNameTh} ( {requestData.companyNameEn} )
                </h3>
              </div>
              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p>สวัสดิการ : {requestData.benefit}</p>
                  <p>ที่อยู่ : {requestData.location}</p>
                  <p>สายการเรียน : {requestData.occupation}</p>
                  <div className="flex gap-2 items-center">
                    <p>เว็บไซต์ :</p>
                    <a
                      className="text-blue-400 truncate w-40 md:w-auto"
                      href={requestData.website}
                      target="_blank"
                    >
                      เข้าชมเว็บไซต์
                    </a>
                  </div>
                  <p className=" flex items-center">
                    MOU :{" "}
                    {requestData.isMou ? (
                      <Check color="green" />
                    ) : (
                      <XIcon color="red" />
                    )}
                  </p>
                </div>

                <div>
                  <p>ชื่อบุคคลติดต่อ : {requestData.contractName}</p>
                  <p>เบอร์โทร : {requestData.contractTel}</p>
                  <p>อีเมล : {requestData.contractEmail}</p>
                  <p className="w-full truncate">
                    Social : {requestData.contractSocial}
                  </p>
                  <p>Line : {requestData.contractSocial_line}</p>
                </div>
                <div className="flex flex-row gap-2 col-span-2">
                  <p>คำอธิบาย : </p>
                  <div className="flex-1">{requestData.description}</div>
                </div>
              </div>

              {/* Website Link */}

              {/* MOU Status */}
            </div>

            {/* รายละเอียดตำแหน่งงาน */}
            <div className="mt-6">
              {requestData.positions && requestData.positions.length > 0 ? (
                <div className="space-y-4 mt-2">
                  {requestData.positions.map((position, idx) => (
                    <div
                      key={position.id}
                      className="border rounded p-4 bg-gray-50 shadow-sm"
                    >
                      <h3 className="text-xl font-semibold">
                        ตำแหน่ง {1 + idx} :
                      </h3>

                      {position.position_description &&
                      position.position_description.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 ml-4">
                          {position.position_description.map((desc) => (
                            <div key={desc.id} className="border-l pl-4">
                              <h4 className="font-semibold">
                                รายละเอียดตำแหน่ง
                              </h4>
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
                                      {skill.tools &&
                                        skill.tools.length > 0 && (
                                          <ul className="list-disc list-inside ml-4">
                                            {skill.tools.map((tool) => (
                                              <li
                                                key={tool.id}
                                                className="mt-1"
                                              >
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
        </div>
        {/* ปุ่มปิด */}
        <DialogFooter className="mt-6 justify-center">
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

export default DataDialog;
