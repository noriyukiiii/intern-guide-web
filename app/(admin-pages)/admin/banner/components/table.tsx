"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Banner {
  id: string;
  title: string;
  image: string;
  order: number;
  isActive: boolean;
  userId: string;
  updatedAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

export default function TableComponent({ data }: { data: Banner[] }) {
  const formatDateToThaiTime = (dateString: string) => {
    const date = new Date(dateString);

    // ใช้ฟังก์ชัน toLocaleDateString และ toLocaleTimeString เพื่อแสดงวันที่และเวลา
    const formattedDate = date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="w-full overflow-x-auto relative">
      <Table className="w-full">
        {/* เพิ่มการทำให้ header ติดอยู่ที่ด้านบน */}
        <TableHeader className="sticky top-10 bg-white z-10">
          <TableRow>
            <TableHead>ลำดับ</TableHead>
            <TableHead>รูปภาพ</TableHead>
            <TableHead>คำอธิบาย</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead>แก้ไขโดย</TableHead>
          </TableRow>
        </TableHeader>
        {/* กำหนดความสูงและการเลื่อนใน TableBody */}
        <TableBody className="overflow-y-auto max-h-[400px]">
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.order}</TableCell>
              <TableCell className="max-w-[300px]">
                <img src={item.image} alt={item.title} />
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.isActive ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                <div>
                  {item.user?.firstName} {item.user?.lastName}
                </div>
                <div>{formatDateToThaiTime(item.updatedAt)}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
