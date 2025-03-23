"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

type Position = {
  companyId: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  name: string;
  updatedAt: string;
};

type Company2 = {
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
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  positions: Position[];
};

type Selectcomp = {
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
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  positions: Position[];
};

interface FavoriteCardProps {
  company: Company2;
  id: string;
  selectedComp: Selectcomp[] | null;
  onRemoveFavorite: (companyId: string) => void;
}

const FavoriteCard = ({ company, id, onRemoveFavorite, selectedComp }: FavoriteCardProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false); // สร้าง state ควบคุม modal

  const handleCompanyClick = () => {
    router.push(`/company-list/${company.id}`);
  };

  const handleSelectCompany = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_RES_API}/company/selectCompany`, {
        userId: id,
        companyId: company.id,
      });

      if (response.data.success) {
        window.location.reload();
      } else {
        alert("เกิดข้อผิดพลาดในการเลือกสถานประกอบการ");
      }
    } catch (error) {
      console.error("Error selecting company:", error);
      alert("Failed to select company");
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_RES_API}/update-favorite`, {
        userId: id,
        companyId: company.id,
        isSelected: false,
      });

      onRemoveFavorite(company.id);
    } catch (error) {
      console.error("Error removing favorite:", error);
      alert("Failed to remove from favorites");
    }
  };

  return (
    <Card className="my-1 hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold truncate hover:cursor-pointer hover:text-blue-500" onClick={handleCompanyClick}>
          {company.companyNameTh} ({company.companyNameEn})
        </CardTitle>
        <div className="flex flex-col !md:flex-row gap-4">
          <div className="flex flex-col flex-1">
            <div className="text-sm">
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
                <span key={idx}>{position.name === "Unknown" ? "ไม่มีข้อมูล" : position.name}{idx < company.positions.length - 1 ? ", " : ""}</span>
              ))}
              <br />
              สวัสดิการ : {company.benefit ? "มีสวัสดิการ" : "ไม่มีข้อมูล"} | จังหวัด : {company.province}
              <div>ที่ตั้ง : {company.location} </div>
            </div>
          </div>

          <div className="flex flex-row gap-2 justify-end items-center">
            <Button className="bg-rose-500 hover:bg-rose-600" onClick={handleRemoveFavorite}>
              ลบ
            </Button>

            {selectedComp && selectedComp.length > 0 ? (
              <Button disabled className="bg-gray-400">
                มีบริษัทที่เลือกแล้ว
              </Button>
            ) : (
              <>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button>เลือกสถานประกอบการนี้</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>ยืนยันการเลือก</DialogTitle>
                    <DialogDescription>
                      ท่านแน่ใจหรือไม่ว่าต้องการเลือกบริษัท <b>{company.companyNameTh}</b>?
                      <br />
                      หากยืนยันแล้วจะไม่สามารถเปลี่ยนแปลงได้
                    </DialogDescription>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpen(false)}>
                        ยกเลิก
                      </Button>
                      <Button onClick={() => { handleSelectCompany(); setOpen(false); }}>
                        ยืนยัน
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteCard;
