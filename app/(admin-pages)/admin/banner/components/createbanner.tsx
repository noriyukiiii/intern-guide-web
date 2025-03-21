"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";
import { toast } from "react-toastify";
import { UploadButton } from "@/utils/uploadthing";

const CreateBannerForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const router = useRouter();
  const { session } = useSession();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    isActive: false,
    userId: session.user?.id, // แก้เป็น user id จริง
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedImageUrl) {
      toast.error("กรุณาอัปโหลดรูปภาพก่อน", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_RES_API}/banner/createBanner`, {
        ...formData,
        image: uploadedImageUrl,
      });
      router.refresh(); // รีเฟรชข้อมูล
      toast.success("สร้าง Banner สำเร็จ", {
        position: "top-center",
        autoClose: 1000,
      });
      onSuccess(); // ✅ เรียกฟังก์ชันปิด Dialog
    } catch (error) {
      console.error("Error creating banner:", error);
    }
  };

  const deleteOldImage = async (oldImageUrl: string) => {
    try {
      const fileName = oldImageUrl.split("/").pop();
      if (fileName) {
        const deleteUrl = `${process.env.NEXT_PUBLIC_BASE_RES_API}/uploadthing/delete/${fileName}`;
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      {uploadedImageUrl && (
        <div className="mt-4 flex justify-center items-center">
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            className="max-w-[200px] h-auto rounded-md shadow-lg"
          />
        </div>
      )}
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

      <Button type="submit">Create</Button>
    </form>
  );
};

export default CreateBannerForm;
