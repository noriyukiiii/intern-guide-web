//actions/updateUser.ts
"use server";

import { db } from "@/lib/db";
import { z } from "zod";

// Validation Schema สำหรับข้อมูลที่ต้องการอัปเดต
const updateUserSchema = z.object({
  email: z.string().email(), // ใช้ email แทน userId ในการค้นหา
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  phone: z.string().min(10),
  studentId: z.string().min(13),
  avatar: z.string(),
  occupation: z.string().optional(),
  benefit: z.string().optional(),
  province: z.string().optional(),
  position: z.string().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export async function updateUserApi(values: UpdateUserInput): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // ตรวจสอบข้อมูลที่ส่งเข้ามา
    const validation = updateUserSchema.safeParse(values);

    if (!validation.success) {
      return {
        success: false,
        message: "Invalid input data",
      };
    }

    const {
      email,
      firstname,
      lastname,
      phone,
      studentId,
      avatar,
      occupation,
      province,
      position,
      benefit,
    } = validation.data;

    let BenefitReal: boolean | null = null; // กำหนดค่าเริ่มต้นเป็น null

    if (benefit === "มีสวัสดิการ") {
      BenefitReal = true; // ถ้า benefit เป็น "มีสวัสดิการ" ให้ค่าเป็น true
    } else if (benefit === "") {
      BenefitReal = null; // ถ้า benefit เป็นค่าว่าง (""), ให้เป็น null
    } else {
      BenefitReal = false; // ถ้าไม่ใช่ทั้งสองกรณีก่อนหน้า ให้ค่าเป็น false
    }

    // ตรวจสอบว่าผู้ใช้มีอยู่จริงหรือไม่
    const existingUser = await db.user.findUnique({ where: { email } });
    if (!existingUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // อัปเดตข้อมูลผู้ใช้
    await db.user.update({
      where: { email }, // ใช้ email ในการค้นหา
      data: {
        firstName: firstname,
        lastName: lastname,
        phone,
        studentId,
        image: avatar,
        occupation,
        province,
        position,
        benefit: BenefitReal,
      },
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
}

export async function toggleRoleAction(userId: string) {
  try {
    // ค้นหา user ปัจจุบัน
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // สลับ role
    const newRole = user.role === "ADMIN" ? "MEMBER" : "ADMIN";

    // อัปเดต role
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    return {
      success: true,
      message: `User role updated to ${newRole}`,
      user: updatedUser,
    };
  } catch (error) {
    console.error("Error toggling user role:", error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
}
