"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

interface UserProfileProps {
  data: {
    session: any; // หรือใช้ type ที่ถูกต้อง
  };
}

const UserProfile = ({ data }: UserProfileProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // ใช้ useEffect เพื่อตรวจสอบ session และเปลี่ยนสถานะการโหลด
  useEffect(() => {
    if (data.session) {
      setIsLoading(false); // เปลี่ยนสถานะการโหลดเมื่อมีข้อมูล session
    }
  }, [data.session]);

  if (isLoading) {
    return <p>Loading . . .</p>;
  }

  return (
    <div>
      {data.session ? (
        <Card className="mx-auto max-w-2xl">
          <CardContent>
            <CardHeader>
              <CardTitle className="text-center">ข้อมูลผู้ใช้</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center gap-12">
                <div className="border h-24 w-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-300">
                  <img
                    src={`https://ui-avatars.com/api/?name=${data.session.user?.firstName}+${data.session.user?.lastName}&background=random&color=fff&length=1&bold=true&font-size=0.40&font=Roboto&format=svg`}
                    alt="user image"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2">
                    <p className="font-bold">ชื่อ-นามสกุล :</p>
                    <p>
                      {data.session.user?.firstName || "loading"}{" "}
                      {data.session.user?.lastName || "loading"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="font-bold">รหัสนักศึกษา :</p>
                    <p>{data.session.user?.studentId || "loading"}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="font-bold">โทรศัพท์ :</p>
                    <p>{data.session.user?.phone || "loading"}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2  lg:grid-cols-4 gap-4 flex-wrap w-fit mx-auto mt-4">
                {/* แสดงอาชีพ (Occupation) */}
                {data.session.user.occupation && (
                  <span className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium text-center">
                    {data.session.user.occupation}
                  </span>
                )}

                {/* แสดงตำแหน่ง (Position) */}
                {data.session.user.position && (
                  <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium text-center">
                    {data.session.user.position}
                  </span>
                )}

                {/* แสดงจังหวัด (Province) */}
                {data.session.user.province && (
                  <span className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm font-medium text-center">
                    {data.session.user.province}
                  </span>
                )}

                {/* แสดงสวัสดิการ (Benefit) */}
                {data.session.user.benefit !== null && (
                  <span className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium text-center">
                    {data.session.user.benefit
                      ? "มีสวัสดิการ"
                      : "ไม่มีสวัสดิการ"}
                  </span>
                )}
              </div>
            </CardContent>
          </CardContent>
        </Card>
      ) : (
        <p>No session data available.</p>
      )}
    </div>
  );
};

export default UserProfile;
