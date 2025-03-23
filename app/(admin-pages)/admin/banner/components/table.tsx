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
import EditBannerDialog from "./editbanner";
import { useSession } from "@/hooks/use-session";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // จำนวนรายการต่อหน้า

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const { session } = useSession();
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
  const paginatedData = banners.slice(startIndex, startIndex + itemsPerPage);

  const handleChange = async (bannerId: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/banner/update_isActive/${bannerId}`
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
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/banner/deleteBanner/${bannerId}`
      );
      toast.success("ลบแบนเนอร์สำเร็จ", {
        position: "top-center",
        autoClose: 1000,
      });
      setTimeout(() => {
        location.reload(); // รีเฟรชหน้า
      }, 1000); // หน่วงเวลา 1 วินาทีให้ toast แสดงก่อนรีเฟรช
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
        await axios.patch(`${process.env.NEXT_PUBLIC_BASE_RES_API}/banner/update_order`, {
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
        await axios.patch(`${process.env.NEXT_PUBLIC_BASE_RES_API}/banner/update_order`, {
          banners: orderData,
        });
        toast.success("ลำดับแบนเนอร์ถูกบันทึก");

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
      <div className="h-[600px] flex flex-col">
        {/* ✅ หัวตาราง (ไม่เลื่อน) */}
        <Table className="w-full flex-1 border">
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              {/* <TableHead>ลำดับ</TableHead> */}
              <TableHead className="text-center">รูปภาพ</TableHead>
              <TableHead>คำอธิบาย</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>ผู้แก้ไข</TableHead>
              <TableHead className="text-center">จัดลำดับ</TableHead>
              <TableHead className="text-center">จัดการ</TableHead>
            </TableRow>
          </TableHeader>

          {/* ✅ เนื้อหาตาราง (เลื่อนได้) */}
          <TableBody className="overflow-y-auto max-h-[400px] border">
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                {/* <TableCell>{item.order}</TableCell> */}
                <TableCell className="max-h-[300px] justify-center flex">
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
                    {session.user?.id && (
                      <EditBannerDialog
                        banner={item}
                        user={{ id: session.user.id }}
                      />
                    )}
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
      </div>

      {/* ✅ Pagination แยกออกมา (ไม่เลื่อนตาม) */}
      <div className="sticky bottom-0 bg-white p-2 flex justify-center space-x-2 border-t">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </Button>
        <span className="px-3 py-1">
          {currentPage} / {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>

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
