"use server";

import { RegisterFormSchema } from "@/validations/rules";

export async function register(state: any, formData: FormData) {
  // Validate ข้อมูลที่ส่งมาจาก Client
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    // ถ้า validate ไม่ผ่าน ส่ง Error กลับไปยัง Client
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // สมัครสมาชิกสำเร็จ (สามารถเพิ่ม logic เช่น บันทึกลง Database ตรงนี้ได้)
  console.log("User created successfully:", validatedFields.data);
  return { success: true };
}
