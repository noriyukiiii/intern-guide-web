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
        <Card className="mx-auto md:w-1/2">
          <CardContent>
            <CardHeader>
              <CardTitle className="text-center">ข้อมูลผู้ใช้</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-center justify-center gap-12">
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
