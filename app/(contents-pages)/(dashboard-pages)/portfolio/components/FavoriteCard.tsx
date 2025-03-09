"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

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
  positions: Position[]; // Array of positions
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
  createdAt: string; // or Date, depending on your preference
  updatedAt: string; // or Date
  deletedAt: string | null; // 'null' if not deleted
  positions: Position[]; // Array of positions
};
interface FavoriteCardProps {
  company: Company2;
  id: string; // เพิ่ม id (userid) เข้าไปใน props
  selectedComp: Selectcomp[] | null;
  onRemoveFavorite: (companyId: string) => void; // เพิ่ม prop นี้
}

const FavoriteCard = ({
  company,
  id,
  onRemoveFavorite,
  selectedComp,
}: FavoriteCardProps) => {
  const router = useRouter();

  const handleCompanyClick = () => {
    router.push(`/company-list/${company.id}`);
  };

  const handleSelectCompany = async () => {
    try {
      const response = await axios.post(
        "https://api-sigma-azure-86.vercel.app/company/selectCompany",
        {
          userId: id,
          companyId: company.id,
        }
      );

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
      const response = await axios.post(
        "https://api-sigma-azure-86.vercel.app/update-favorite",
        {
          userId: id,
          companyId: company.id,
          isSelected: false,
        }
      );

      onRemoveFavorite(company.id);
    } catch (error) {
      console.error("Error removing favorite:", error);
      alert("Failed to remove from favorites");
    }
  };

  return (
    <Card className="my-1">
      <CardContent className="p-4">
        <CardTitle
          className="text-lg font-semibold truncate hover:cursor-pointer hover:text-blue-500"
          onClick={handleCompanyClick}
        >
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

          <div className="flex flex-row gap-2 justify-end items-center">
            <Button
              className="bg-rose-500 hover:bg-rose-600"
              onClick={handleRemoveFavorite}
            >
              ลบ
            </Button>
            {/* ถ้ามี selectedComp ให้ Disable ปุ่มและเปลี่ยนข้อความ */}
            {selectedComp && selectedComp.length > 0 ? (
              <Button disabled className="bg-gray-400">
                มีบริษัทที่เลือกแล้ว
              </Button>
            ) : (
              <Button onClick={handleSelectCompany}>
                เลือกสถานประกอบการนี้
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default FavoriteCard;
