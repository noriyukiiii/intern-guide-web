import { z } from "zod";

// สร้าง Schema สำหรับ Company
export const companySchema = z.object({
  companyNameTh: z
    .string()
    .min(1, { message: "กรุณากรอกชื่อบริษัท (ภาษาไทย)" }),
  companyNameEn: z
    .string()
    .min(1, { message: "กรุณากรอกชื่อบริษัท (ภาษาอังกฤษ)" }),
  description: z.string().optional(), // สามารถไม่กรอกได้
  otherDescription: z.string().optional(),
  location: z.string().optional(),
  province: z.string().optional(),
  contractName: z.string().optional(),
  contractTel: z.string().optional(),
  contractEmail: z.string().optional(),
  contractSocial: z.string().optional(),
  contractSocial_line: z.string().optional(),
  establishment: z.string().optional(), // สามารถไม่กรอกได้
  website: z.string().optional(),
  benefit: z.string().optional(),
  occupation: z.enum(["network", "database", "both"], {
    message: "กรุณาเลือกอาชีพ",
  }), // ตัวเลือกอาชีพ
  imgLink: z.string().optional(),
  isMou: z.boolean(), // กำหนดเป็น boolean โดยตรง
  positions: z
    .array(
      z.object({
        id: z.string(), // เพิ่ม id สำหรับแต่ละตำแหน่ง
        name: z.string(),
        position_description: z
          .array(
            z.object({
              id: z.string(), // เพิ่ม id สำหรับแต่ละคำอธิบายตำแหน่ง
              description: z.string(),
              skills: z
                .array(
                  z.object({
                    id: z.string(), // เพิ่ม id สำหรับแต่ละทักษะ
                    name: z.string(),
                    tools: z
                      .array(
                        z.object({
                          id: z.string(), // เพิ่ม id สำหรับแต่ละเครื่องมือ
                          name: z.string(),
                        })
                      )
                      .min(1, {
                        message: "ต้องมีเครื่องมืออย่างน้อย 1 รายการ",
                      }), // กำหนดให้ tools ต้องมีอย่างน้อย 1 รายการ
                  })
                )
                .min(1, { message: "ต้องมีทักษะอย่างน้อย 1 รายการ" }), // กำหนดให้ skills ต้องมีอย่างน้อย 1 รายการ
            })
          )
          .min(1, { message: "ต้องมีตำแหน่งงานอย่างน้อย 1 รายการ" }), // กำหนดให้ position_description ต้องมีอย่างน้อย 1 รายการ
      })
    )
    .min(1, { message: "ต้องมีตำแหน่งอย่างน้อย 1 รายการ" }), // กำหนดให้ positions ต้องมีอย่างน้อย 1 รายการ
});

// สร้าง TypeScript Type สำหรับ Schema
export type CompanySchema = z.infer<typeof companySchema>;
