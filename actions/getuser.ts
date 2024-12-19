import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserById = async (userId: string) => {
  try {
    // ค้นหาผู้ใช้จาก userId โดยไม่ดึงฟิลด์ password
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        telephone: true,
        student_id: true,
        // ไม่รวม password
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
