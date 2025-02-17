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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select"; // เพิ่ม Select import
import { toast } from "react-toastify";
import axios from "axios";
import { Ellipsis } from "lucide-react";

export default function EditUserDialog({
  user, // รับ user มาเป็น props
}: {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    studentId: string;
    phone: string;
    role: string; // เพิ่ม role มาใน props ด้วย
  };
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    studentId: user.studentId,
    phone: user.phone,
    role: user.role, // เพิ่ม role ใน formData
  });

  useEffect(() => {
    // รีเซ็ตข้อมูลฟอร์มเมื่อ Dialog ปิด
    if (!open) {
      setFormData({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        studentId: user.studentId,
        phone: user.phone,
        role: user.role, // รีเซ็ต role
      });
    }
  }, [open, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://localhost:5555/user/update`,
        formData // ส่งข้อมูลที่แก้ไขทั้งหมดไปยัง API
      );

      console.log("API response:", response);

      toast.success("แก้ไขผู้ใช้สำเร็จ", {
        position: "top-center",
        autoClose: 1000,
      });

      setTimeout(() => {
        setOpen(false);
        location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5555/user/delete/${user.id}`
      );
      toast.success("ลบผู้ใช้สำเร็จ", {
        position: "top-center",
        autoClose: 1000,
      });
      setTimeout(() => {
        setOpen(false);
        location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="hover:bg-gray-200"
        onClick={() => setOpen(true)}
      >
        <Ellipsis size={16} />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent aria-describedby="edit-banner-form-description">
          <DialogDescription></DialogDescription>
          <DialogHeader>
            <DialogTitle>จัดการผู้ใช้</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Label className="text-md">ชื่อจริง</Label>
            <Input
              name="firstName"
              placeholder="ชื่อจริง"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Label className="text-md">นามสกุล</Label>
            <Input
              name="lastName"
              placeholder="นามสกุล"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <Label className="text-md">รหัสนักศึกษา</Label>
            <Input
              name="studentId"
              placeholder="รหัสนักศึกษา"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
            <Label className="text-md">โทรศัพท์</Label>
            <Input
              name="phone"
              placeholder="โทรศัพท์"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Label className="text-md">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกบทบาท" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="MEMBER">Member</SelectItem>
              </SelectContent>
            </Select>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                className="bg-red-400 hover:bg-red-500"
                onClick={handleDelete}
              >
                ลบผู้ใช้
              </Button>
              <Button type="submit">แก้ไข</Button>
            </div>
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
