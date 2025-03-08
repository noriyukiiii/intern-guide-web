import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { UploadButton } from "@/utils/uploadthing";
import { link } from "fs";
import { Label } from "@/components/ui/label";

export default function EditBannerDialog({
  banner,
  user, // รับ user มาเป็น props
}: {
  banner: {
    id: string;
    title: string;
    image: string;
    linkUrl: string;
    isActive: boolean;
  };
  user: { id: string }; // ระบุ type สำหรับ user
}) {
  const [open, setOpen] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: banner.id,
    title: banner.title,
    linkUrl: banner.linkUrl,
    image: banner.image,
    isActive: banner.isActive,
    userId: user.id, // แก้เป็น user id จริง
  });

  useEffect(() => {
    // รีเซ็ตข้อมูลฟอร์มเมื่อ Dialog ปิด
    if (!open) {
      setFormData({
        id: banner.id,
        title: banner.title,
        image: banner.image,
        linkUrl: banner.linkUrl,
        isActive: banner.isActive,
        userId: user.id,
      });
      setUploadedImageUrl(null); // รีเซ็ต URL ของภาพที่อัปโหลด
    }
  }, [open, banner, user.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // เช็คว่ามีการอัปโหลดรูปหรือยัง
    if (!uploadedImageUrl && !formData.image) {
      toast.error("กรุณาอัปโหลดรูปภาพก่อน", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }

    try {
      console.log("Form data before submit:", formData); // ดีบักที่นี่

      // ถ้ามีการเปลี่ยนแปลงรูปภาพ (uploadedImageUrl หรือ formData.image)
      if (uploadedImageUrl && formData.image !== banner.image) {
        const fileName = banner.image.split("/").pop(); // หาชื่อไฟล์เก่า
        const deleteUrl = `http://localhost:5555/uploadthing/delete/${fileName}`;
        await axios.delete(deleteUrl); // ลบรูปเก่า
      }

      const response = await axios.patch(
        `http://localhost:5555/newsbanner/update_banner`,
        {
          ...formData,
          image: uploadedImageUrl || formData.image, // ใช้ภาพใหม่หรือภาพเก่า
        }
      );

      console.log("API response:", response); // ดูข้อมูลที่ API ตอบกลับ

      // แสดง toast ก่อนรีเฟรช
      toast.success("แก้ไข Banner สำเร็จ", {
        position: "top-center",
        autoClose: 1000,
      });

      // รีเฟรชหน้าหลังจากแสดง toast
      setTimeout(() => {
        location.reload(); // รีเฟรชหน้า
      }, 1000); // หน่วงเวลา 1 วินาทีให้ toast แสดงก่อนรีเฟรช
      setOpen(false);
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  const deleteOldImage = async (oldImageUrl: string) => {
    try {
      const fileName = oldImageUrl.split("/").pop();
      if (fileName) {
        const deleteUrl = `http://localhost:5555/uploadthing/delete/${fileName}`;
        await fetch(deleteUrl, { method: "DELETE" });
        toast.success("ลบรูปภาพเก่าเรียบร้อยแล้ว", {
          position: "top-center",
          autoClose: 1000,
        });
      } else {
        throw new Error("ไม่พบชื่อไฟล์ที่ต้องการลบ");
      }
    } catch (error) {
      toast.error("ไม่สามารถลบรูปภาพเก่าได้", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      {/* ปุ่มกดเปิด Dialog */}
      <Button
        variant="ghost"
        className="hover:bg-gray-200"
        onClick={() => setOpen(true)}
      >
        <Pencil />
      </Button>

      {/* Dialog สำหรับแก้ไข */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent aria-describedby="edit-banner-form-description">
          <DialogDescription></DialogDescription>
          <DialogHeader>
            <DialogTitle>แก้ไขแบนเนอร์</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Label>ชื่อหัวข้อ</Label>
            <Input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Label>ลิ้งค์เว็บไซต์</Label>
            <Input
              name="linkUrl"
              placeholder="Link URL"
              value={formData.linkUrl}
              onChange={handleChange}
              required
            />
            <div className="mt-4 flex justify-center items-center">
              <img
                src={uploadedImageUrl || banner.image} // ถ้ามี uploadedImageUrl ใช้อันนี้ ถ้าไม่มีใช้ banner.image
                alt="Banner"
                className="max-w-[200px] h-auto rounded-md shadow-lg"
              />
            </div>
            {/* ปุ่มอัปโหลดรูปภาพ */}
            <div>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res: any) => {
                  if (uploadedImageUrl) {
                    deleteOldImage(uploadedImageUrl);
                  }
                  const newImageUrl = res[0].url;
                  setUploadedImageUrl(newImageUrl);
                  setFormData((prev) => ({ ...prev, image: newImageUrl }));

                  toast.success("อัพโหลดรูปสำเร็จ", {
                    position: "top-center",
                    autoClose: 1000,
                  });
                }}
                onUploadError={() => {
                  toast.error("อัพโหลดรูปภาพไม่สำเร็จ", {
                    position: "top-center",
                    autoClose: 1000,
                  });
                }}
              />
            </div>

            <Button type="submit">Save</Button>
          </form>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              ยกเลิก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
