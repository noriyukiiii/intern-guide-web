import { z } from "zod";

// สร้าง Schema สำหรับ Sign In
export const signInSchema = z.object({
  email: z.string().email({ message: "กรุณากรอกอีเมลให้ถูกต้อง" }),
  password: z
    .string()
    .min(6, { message: "กรุณากรอกรหัสให้ถูกต้อง" }),
});

// สร้าง TypeScript Type สำหรับ Schema
export type SignInSchema = z.infer<typeof signInSchema>;
