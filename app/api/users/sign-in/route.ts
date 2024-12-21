// app/api/users/sign-in/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session"; // นำเข้า logic การสร้าง session

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password }: { email: string; password: string } = await req.json();

    // หาผู้ใช้จากฐานข้อมูล
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "ไม่พบผู้ใช้" }, { status: 404 });
    }

    // ตรวจสอบรหัสผ่านที่ส่งมาว่าตรงกับที่เก็บไว้หรือไม่
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "รหัสผ่านไม่ถูกต้อง" }, { status: 401 });
    }

    // สร้าง session และตั้งคุกกี้
    await createSession(user.user_id);

    // คืนค่าข้อความสำเร็จ
    return NextResponse.json({ message: "เข้าสู่ระบบสำเร็จ" }, { status: 200 });

  } catch (error) {
    console.error("เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ:", error);
    return NextResponse.json({ message: "เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ" }, { status: 500 });
  }
}
