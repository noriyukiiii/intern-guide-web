"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpAdminAction } from "@/actions/signUpAdmin";
import { toast } from "react-toastify";

// ✅ Schema สำหรับฟอร์ม
const adminSchema = z.object({
  email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
  firstName: z.string().min(2, "ชื่อจริงต้องมีอย่างน้อย 2 ตัวอักษร"),
  lastName: z.string().min(2, "นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร"),
  password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
  telephone: z
    .string()
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
});

const AddAdminDialog = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ react-hook-form ร่วมกับ zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(adminSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const result = await signUpAdminAction(data);

      if (result.success) {
        toast.success(result.message);
        reset(); // ✅ ล้างฟอร์ม
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ฟังก์ชันปิด Dialog และล้างฟอร์ม
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <div className="flex justify-end mr-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>เพิ่ม User Admin</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>เพิ่มผู้ดูแลระบบ</DialogTitle>
            <DialogDescription>
              กรอกข้อมูลเพื่อเพิ่มผู้ใช้เป็น Admin
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* อีเมล */}
            <input
              type="text"
              autoComplete="off"
              placeholder="อีเมล"
              className="w-full p-2 border rounded-lg"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{String(errors.email.message)}</p>
            )}

            {/* รหัสผ่าน */}
            <input
              type="password"
              autoComplete="new-password"
              placeholder="รหัสผ่าน"
              className="w-full p-2 border rounded-lg"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">{String(errors.password.message)}</p>
            )}

            {/* ชื่อจริง & นามสกุล */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="ชื่อจริง"
                  className="w-full p-2 border rounded-lg"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-500">
                    {String(errors.firstName.message)}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="นามสกุล"
                  className="w-full p-2 border rounded-lg"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500">
                    {String(errors.lastName.message)}
                  </p>
                )}
              </div>
            </div>

            {/* เบอร์โทรศัพท์ */}
            <div>
              <input
                type="text"
                autoComplete="tel"
                placeholder="เบอร์โทรศัพท์"
                className="w-full p-2 border rounded-lg"
                {...register("telephone")}
              />
              {errors.telephone && (
                <p className="text-red-500">
                  {String(errors.telephone.message)}
                </p>
              )}
            </div>

            {/* ปุ่มกดยืนยัน */}
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
              >
                ยกเลิก
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "กำลังเพิ่ม..." : "เพิ่ม"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddAdminDialog;
