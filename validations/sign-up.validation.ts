import { z } from "zod";

// Schema หลัก (ยังไม่รวม superRefine)
const baseSignUpSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  firstname: z.string().min(1, { message: "First name is required" }),
  telephone: z.string().min(10, { message: "Telephone is required" }),
  student_id: z.string().min(1, { message: "Student ID is required" }),
});

// ใช้ superRefine สำหรับ validate password และ confirmPassword
export const signUpSchema = baseSignUpSchema.superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
});

// Schema สำหรับ validate ฟิลด์บางส่วน
export const partialSignUpSchema = baseSignUpSchema.pick({
  email: true,
  password: true,
  confirmPassword: true,
});

// Export types
export type SignUpSchema = z.infer<typeof signUpSchema>;
export type PartialSignUpSchema = z.infer<typeof partialSignUpSchema>;
