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

    const { email, firstname, lastname, phone, studentId, avatar } =
      validation.data;

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
