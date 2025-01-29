import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import BannerDialog from "./BannerDialog";
import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [activeStates, setActiveStates] = useState<Record<string, boolean>>(
    data.reduce(
      (acc, item) => {
        acc[item.id] = item.isActive;
        return acc;
      },
      {} as Record<string, boolean>
    )
  );

  const [openDialog, setOpenDialog] = useState<string | null>(null); // สถานะสำหรับควบคุม dialog
  const [banners, setBanners] = useState<Banner[]>(data); // สถานะสำหรับเก็บข้อมูลแบนเนอร์ที่จัดลำดับใหม่แล้ว

  const handleChange = async (bannerId: string) => {
    try {
      await axios.patch(
        `http://localhost:5555/banner/update_isActive/${bannerId}`
      );

      setActiveStates((prevState) => ({
        ...prevState,
        [bannerId]: !prevState[bannerId],
      }));
    } catch (error) {
      console.error("Error updating banner status:", error);
      setActiveStates((prevState) => ({
        ...prevState,
        [bannerId]: !prevState[bannerId],
      }));
    }
  };

  const handleDelete = async (bannerId: string) => {
    try {
      await axios.delete(
        `http://localhost:5555/banner/deleteBanner/${bannerId}`
      );
      toast.success("ลบแบนเนอร์สำเร็จ");
      router.refresh(); // รีเฟรชข้อมูล
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("ลบแบนเนอร์ไม่สำเร็จ");
    }
  };

  const moveBannerUp = async (bannerId: string) => {
    const index = banners.findIndex((banner) => banner.id === bannerId);
    if (index > 0) {
      const newBanners = [...banners];
      const temp = newBanners[index];
      newBanners[index] = newBanners[index - 1];
      newBanners[index - 1] = temp;
      setBanners(newBanners);

      // ส่งข้อมูลไปยัง API ทันทีหลังจากการเปลี่ยนแปลง
      const orderData = newBanners.map((banner, index) => ({
        id: banner.id,
        order: index + 1, // ตั้งค่าใหม่จากตำแหน่งใน array
      }));

      try {
        await axios.patch("http://localhost:5555/banner/update_order", {
          banners: orderData,
        });
        toast.success("ลำดับแบนเนอร์ถูกบันทึก");
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการบันทึกลำดับแบนเนอร์");
        console.error("Error saving banner order:", error);
      }
    }
  };

  const moveBannerDown = async (bannerId: string) => {
    const index = banners.findIndex((banner) => banner.id === bannerId);
    if (index < banners.length - 1) {
      const newBanners = [...banners];
      const temp = newBanners[index];
      newBanners[index] = newBanners[index + 1];
      newBanners[index + 1] = temp;
      setBanners(newBanners);

      // ส่งข้อมูลไปยัง API ทันทีหลังจากการเปลี่ยนแปลง
      const orderData = newBanners.map((banner, index) => ({
        id: banner.id,
        order: index + 1, // ตั้งค่าใหม่จากตำแหน่งใน array
      }));

      try {
        await axios.patch("http://localhost:5555/banner/update_order", {
          banners: orderData,
        });
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการบันทึกลำดับแบนเนอร์");
        console.error("Error saving banner order:", error);
      }
    }
  };

  const formatDateToThaiTime = (dateString: string) => {
    const date = new Date(dateString);
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
    return `${formattedDate} เวลา ${formattedTime}`;
  };

  // ฟังก์ชันเปิด dialog
  const handleOpenDialog = (bannerId: string) => {
    setOpenDialog(bannerId); // เปลี่ยนสถานะให้เป็น ID ของแบนเนอร์ที่ต้องการเปิด
  };

  // ฟังก์ชันปิด dialog
  const handleCloseDialog = () => {
    setOpenDialog(null); // ปิด dialog
  };

  return (
    <div className="w-full overflow-x-auto relative font-Prompt">
      <ToastContainer />
      <Table className="w-full">
        <TableHeader className="stick top-0 bg-white z-10 border">
          <TableRow>
            {/* <TableHead>ลำดับ</TableHead> */}
            <TableHead>รูปภาพ</TableHead>
            <TableHead>คำอธิบาย</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead>ผู้แก้ไข</TableHead>
            <TableHead className="text-center">จัดลำดับ</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="overflow-y-auto max-h-[400px] border">
          {banners.map((item) => (
            <TableRow key={item.id}>
              {/* <TableCell>{item.order}</TableCell> */}
              <TableCell className="max-w-[300px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cursor-pointer max-w-[150px] h-auto rounded-md shadow-lg"
                  onClick={() => handleOpenDialog(item.id)} // เปิด dialog เมื่อคลิกที่รูปภาพ
                />
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <Switch
                  checked={activeStates[item.id]}
                  onCheckedChange={() => handleChange(item.id)}
                />
              </TableCell>
              <TableCell>
                <div>
                  {item.user?.firstName} {item.user?.lastName}
                </div>
                <div>{formatDateToThaiTime(item.updatedAt)}</div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => moveBannerUp(item.id)}
                    className="hover:bg-gray-200"
                  >
                    <ArrowUp />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => moveBannerDown(item.id)}
                    className="hover:bg-gray-200"
                  >
                    <ArrowDown />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center space-x-2">
                  <Button variant="ghost" className="hover:bg-gray-200">
                    <Pencil />
                  </Button>
                  <Button
                    variant="ghost"
                    className="hover:bg-rose-500 text-red-500"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ใช้ BannerDialog ในการแสดงผล Dialog */}
      {openDialog && (
        <BannerDialog
          open={true}
          onClose={handleCloseDialog} // ฟังก์ชันปิด dialog
          image={banners.find((item) => item.id === openDialog)?.image || ""}
          title={banners.find((item) => item.id === openDialog)?.title || ""}
        />
      )}
    </div>
  );
}
