// import { NextResponse } from 'next/server'; // ใช้ NextResponse สำหรับการตอบกลับ
// import { PrismaClient } from '@prisma/client';
// import { getUserDetailsFromCookie } from '@/lib/session';

// const prisma = new PrismaClient();

// // Export สำหรับ HTTP GET
// export async function GET(req: Request) {
//   try {
//     // ดึงข้อมูลจาก cookie
//     const userId = await getUserDetailsFromCookie();

//     if (!userId || typeof userId !== 'string') {
//       return NextResponse.json({ message: "User not found or invalid userId" }, { status: 400 });
//     }

//     // ใช้ Prisma ค้นหาผู้ใช้จากฐานข้อมูล
//     const user = await prisma.user.findUnique({
//       where: {
//         user_id: userId, // ใช้ userId ที่ได้จาก cookie
//       },
//     });

//     // ถ้าผู้ใช้ไม่พบในฐานข้อมูล
//     if (!user) {
//       return NextResponse.json({ message: "User not found in database" }, { status: 404 });
//     }

//     // ส่งข้อมูลผู้ใช้ทั้งหมดกลับไป
//     return NextResponse.json(user, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching user data", error);
//     return NextResponse.json({ message: "Failed to fetch user data" }, { status: 500 });
//   }
// }
