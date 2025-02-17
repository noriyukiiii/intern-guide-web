import { useState, useEffect } from "react";
import FavoriteCard from "./FavoriteCard";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

type Position = {
  companyId: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  name: string;
  updatedAt: string;
};

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
  positions: Position[];  // Array of positions
};
interface FavoriteContentProps {
  data: Company[] | null;
  userid: string; // เพิ่ม userid เข้าไปใน props
  selectedComp : Selectcomp[] | null
}

const FavoriteContent = ({ data, userid, selectedComp }: FavoriteContentProps) => {
  const [favorites, setFavorites] = useState<Company[] | null>(null); // เริ่มต้นเป็น null
  const [isLoading, setIsLoading] = useState<boolean>(true); // สถานะการโหลดข้อมูล

  useEffect(() => {
    if (data) {
      setFavorites(data); // เมื่อ data มาแล้ว ให้เซ็ต favorites
      setIsLoading(false); // เปลี่ยนสถานะการโหลดให้เสร็จสมบูรณ์
    }
  }, [data]); // ใช้ data ใน dependency array

  // ฟังก์ชันที่ใช้เมื่อกดปุ่ม "เอาออกจากรายการโปรด"
  const handleRemoveFavorite = (companyId: string) => {
    // ลบบริษัทออกจาก array ของ favorites ทันที
    setFavorites(favorites?.filter((company) => company.id !== companyId) || []);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <p>กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
        <Card className="p-4 w-fit">
          <CardTitle>รายการโปรด</CardTitle>
        </Card>
        <div className="my-2 border w-full"></div>
        <Card>
          <CardContent className="p-6">
            <CardTitle className="text-lg font-normal text-center">
              ไม่มีรายการโปรด
            </CardTitle>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg">
      <Card className="p-4 w-fit">
        <CardTitle>รายการโปรด</CardTitle>
      </Card>
      <div className="my-4 border-t w-full"></div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {favorites?.map((company) => (
          <FavoriteCard
            key={company.id}
            company={company}
            id={userid}
            selectedComp={selectedComp} // ส่งข้อมูลของบริษัทที่เลือกไปที่ FavoriteCard
            onRemoveFavorite={handleRemoveFavorite} // ส่งฟังก์ชันลบไปที่ FavoriteCard
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteContent;
