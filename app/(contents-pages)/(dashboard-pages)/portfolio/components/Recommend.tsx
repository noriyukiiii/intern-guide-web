import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useSession } from "@/hooks/use-session";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RecommendContent = () => {
  const { session } = useSession(); // ใช้ session ของผู้ใช้
  const [recommendedCompanies, setRecommendedCompanies] = useState<any[]>([]); // เก็บข้อมูลบริษัทที่แนะนำ
  const [isLoading, setIsLoading] = useState<boolean>(false); // สถานะการโหลด
  const router = useRouter();
  useEffect(() => {
    const fetchRecommend = async () => {
      setIsLoading(true); // ตั้งค่า isLoading เป็น true เมื่อเริ่มโหลดข้อมูล
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_RES_API}/user/recommand`,
          {
            params: { userId: session?.user?.id }, // ส่ง userId ไปใน query params
          }
        );

        setRecommendedCompanies(response.data); // เก็บข้อมูลบริษัทที่แนะนำ
      } catch (error) {
        console.error("Error fetching recommended companies", error);
      } finally {
        setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จ
      }
    };

    if (session?.user?.id) {
      fetchRecommend(); // เรียกฟังก์ชันดึงข้อมูลเมื่อ session พร้อม
    }
  }, [session]);

  const handleToggleFavorite = async (company_id: string, status: boolean) => {
    if (!session?.user?.id) return;

    // เปลี่ยนสถานะจาก true เป็น false หรือจาก false เป็น true
    const newStatus = !status;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/update-favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.user.id,
            companyId: company_id,
            isSelected: newStatus,
          }),
        }
      );

      const responseData = await res.json();

      if (responseData.success) {
        setTimeout(() => {
          window.location.reload();
        }, 1000); // ลองหน่วงเวลาเพื่อให้มั่นใจว่า API ทำงานเสร็จแล้ว
        console.log("Favorite updated successfully");
      } else {
        console.error("Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg">
      <Card className="p-4 w-full md:w-3/4 lg:w-full mx-auto">
        <CardTitle className="text-center text-xl font-semibold">
          สถานประกอบการที่แนะนำ
        </CardTitle>
      </Card>
      <div className="my-4 border-t w-full"></div>
      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          // แสดงสถานะการโหลดระหว่างรอข้อมูล
          <div className="flex justify-center items-center py-4">
            <span className="text-lg text-gray-500">กำลังโหลด...</span>
          </div>
        ) : recommendedCompanies.length > 0 ? (
          // แสดงข้อมูลบริษัทที่แนะนำ
          recommendedCompanies.map((company: any) => (
            <Card
              key={company.id}
              className="flex flex-col force-row items-center bg-white p-4 rounded-lg shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
            >
              <Link href={`/company-list/${company.id}`} key={company.id}>
                <div className="overflow-hidden rounded-lg w-48 h-48 mr-4">
                  <img
                    src={company.imgLink}
                    alt={company.companyNameTh}
                    className="w-auto max-h-[200px] mx-auto object-contain"
                  />
                </div>
              </Link>
              {/* ข้อมูลบริษัท */}
              <CardContent className="flex flex-col text-left p-4 w-full">
                <Link href={`/company-list/${company.id}`} key={company.id}>
                  <CardTitle className="text-xl font-semibold text-gray-800 mb-2">
                    {company.companyNameTh}
                  </CardTitle>

                  <div>{company.location}</div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 my-2">
                    {session.user?.occupation && company.benefit.length > 0 ? (
                      <span className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium text-center">
                        {session.user?.occupation}
                      </span>
                    ) : (
                      <span className="px-4 py-2 bg-gray-400 text-white rounded-full text-sm font-medium text-center">
                        ไม่มีสวัสดิการ
                      </span>
                    )}

                    {company.positions && company.positions.length > 0 ? (
                      <span className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium text-center">
                        {session?.user?.position}
                      </span>
                    ) : (
                      <></>
                    )}
                    {company.province && company.province.length > 0 ? (
                      <span className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm font-medium text-center">
                        {company.province}
                      </span>
                    ) : (
                      <></>
                    )}
                    {company.benefit && company.benefit.length > 0 ? (
                      <span className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium text-center">
                        มีสวัสดิการ
                      </span>
                    ) : (
                      <span className="px-4 py-2 bg-gray-400 text-white rounded-full text-sm font-medium text-center">
                        ไม่มีสวัสดิการ
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-1 mt-2 w-full border-t"></div>

                {/* ปุ่มเพิ่มเข้ารายการโปรด */}
                <div className="flex items-center justify-end">
                  <Button
                    className={`w-[120px] text- py-3 rounded-xl transition ${"bg-green-600 hover:bg-green-700"} text-white`}
                    onClick={() => handleToggleFavorite(company.id, false)}
                  >
                    เพิ่มรายการโปรด
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          // ถ้าไม่มีบริษัทที่แนะนำ
          <Card className="flex justify-center items-center bg-gray-100 p-6 rounded-lg shadow-md">
            <CardContent className="text-center">
              <CardTitle className="text-lg font-normal text-gray-500">
                ไม่มีรายการที่แนะนำ
              </CardTitle>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RecommendContent;
