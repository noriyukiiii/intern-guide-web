"use server"

import { db } from "@/lib/db";
import { hashSync } from "bcryptjs";
import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ✅ ปรับชื่อ Schema ให้ตรงกับ Prisma
const signUpAdminSchema = z.object({
  email: z.string().email("อีเมลไม่ถูกต้อง"),
  password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
  firstName: z.string().min(2, "ชื่อจริงต้องมีอย่างน้อย 2 ตัวอักษร"),
  lastName: z.string().min(2, "นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร"),
  telephone: z.string().min(9, "เบอร์โทรศัพท์ต้องมีอย่างน้อย 9 ตัวอักษร"),
});

export async function signUpAdminAction(
  values: z.infer<typeof signUpAdminSchema>
): Promise<{ success: boolean; message: string }> {
  try {
    console.log("🛠 รับค่าจากฟอร์ม:", values);

    // ✅ ตรวจสอบค่าข้อมูล
    const validation = signUpAdminSchema.safeParse(values);
    if (!validation.success) {
      console.error("❌ Validation Error:", validation.error.format());
      return {
        success: false,
        message: "Bad Request",
      };
    }

    const { email, password, firstName, lastName, telephone } = validation.data;

    // ✅ ตรวจสอบว่าผู้ใช้งานมีอยู่แล้วหรือไม่
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    // ✅ แฮชรหัสผ่าน
    const hashedPassword = hashSync(password, 10);
    console.log("🔑 Hashed Password:", hashedPassword);

    // ✅ สร้างบัญชี Admin
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone: telephone,
        studentId: "",
        image: "/userimage/admin.png",
        role: "ADMIN", // ตั้งค่า role เป็น ADMIN
        emailVerified: true,
      },
    });

    // ✅ รีโหลด path เพื่ออัปเดตข้อมูล
    revalidatePath("/admin/user-list");

    return {
      success: true,
      message: "Admin registered successfully.",
    };
  } catch (error) {
    console.error("🔥 Error:", error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
}
