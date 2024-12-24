"use server";

import { db } from "@/lib/db"; // Prisma Client
import { CompanySchema, companySchema } from "@/validations/company.validation"; // Zod validation (ถ้ามีการใช้)
import { revalidatePath } from "next/cache";

export async function insertCompanyActions(values: CompanySchema): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // ตรวจสอบค่าจากฟอร์มด้วย Zod Schema
    const validation = companySchema.safeParse(values);

    if (!validation.success) {
      return {
        success: false,
        message: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง",
      };
    }

    // ดึงข้อมูลที่ได้รับจากฟอร์ม
    const {
      companyNameTh,
      companyNameEn,
      description,
      location,
      contractName,
      contractTel,
      contractEmail,
      contractSocial,
      establishment,
      website,
      position,
      benefit,
      occupation,
      imgLink,
      isMou,
    } = validation.data;

    // ตรวจสอบว่ามีบริษัทนี้ในระบบแล้วหรือไม่ (สามารถเลือกได้ว่าจะตรวจสอบเงื่อนไขใดบ้าง เช่นชื่อบริษัท)
    const existingCompany = await db.company.findFirst({
      where: {
        companyNameTh, // ตรวจสอบชื่อบริษัทในภาษาไทย
      },
    });

    if (existingCompany) {
      return {
        success: false,
        message: "บริษัทนี้มีอยู่แล้วในระบบ",
      };
    }

    // สร้างบริษัทใหม่ในฐานข้อมูล
    const company = await db.company.create({
      data: {
        companyNameTh,
        companyNameEn,
        description,
        location,
        contractName,
        contractTel,
        contractEmail,
        contractSocial,
        establishment,
        website,
        position,
        benefit,
        occupation,
        imgLink,
        isMou,
      },
    });

    // Revalidate หน้าแรกหรือหน้าที่ต้องการ
    revalidatePath("/admin/companies"); // เปลี่ยน URL ตามที่ต้องการ

    return {
      success: true,
      message: "สร้างบริษัทสำเร็จ",
    };
  } catch (error) {
    console.error(error); // เพิ่มการ log ข้อผิดพลาด
    return {
      success: false,
      message: "เกิดข้อผิดพลาดในการสร้างบริษัท",
    };
  }
}
