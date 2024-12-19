"use server";

import { db } from "../lib/db";
import { Prisma } from "@prisma/client";
import { createSession } from "../lib/session"; // import ฟังก์ชัน createSession

export const signInAction = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // ค้นหาผู้ใช้งานจาก email
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
    if (!user) {
      return { success: false, error: "User does not exist" };
    }

    // ตรวจสอบรหัสผ่าน
    if (user.password !== password) {
      return { success: false, error: "Incorrect password" };
    }

    // หากทุกอย่างถูกต้อง
    // สร้างคุกกี้ session สำหรับผู้ใช้
    await createSession(user.id); // เรียกใช้ createSession เพื่อสร้าง session และตั้งคุกกี้
    return { success: true };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Failed to sign in" };
  }
};
