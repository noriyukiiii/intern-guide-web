//actions/updateUser.ts
"use server";

import { db } from "@/lib/db";

export async function getUser() {
    try {
      // ตรวจสอบว่า companyId ถูกส่งมาหรือไม่
      const user = await db.user.findMany({
        where: {
            deletedAt : null
        }
      })
  
      // ตรวจสอบว่าพบข้อมูลบริษัทหรือไม่

  
      return user;
    } catch (error: any) {
      console.error("Error fetching company data:", error.message || error);
      throw new Error("Failed to fetch company data"); // ส่งข้อความ error ออกไปยังส่วนที่เรียกใช้
    }
  }
  