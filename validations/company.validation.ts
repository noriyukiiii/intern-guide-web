import { z } from "zod";

// สร้าง Schema สำหรับ Sign In
export const companySchema = z.object({
  companyNameTh: z.string().min(1, { message: "กรุณากรอกชื่อบริษัท" }),
  companyNameEn: z.string().min(1, { message: "กรุณากรอกชื่อบริษัท" }),
  description: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  contractName: z.string().nullable().optional(),
  contractTel: z.string().nullable().optional(),
  contractEmail: z.string().nullable().optional(),
  contractSocial: z.string().nullable().optional(),
  establishment: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  benefit: z.string().nullable().optional(),
  occupation: z.string().nullable().optional(),
  imgLink: z.string().nullable().optional(),
  isMou: z.boolean(),
});

// สร้าง TypeScript Type สำหรับ Schema
export type CompanySchema = z.infer<typeof companySchema>;
