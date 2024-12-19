import { z } from "zod";

// Schema สำหรับ email, password และ confirmPassword รวมกัน
const emailPasswordConfirmSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .trim(),
  password: z
    .string()
    .min(1, { message: "Not be empty" })
    .min(5, { message: "Be at least 5 characters long" })
    .regex(/[a-zA-z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
  confirmPassword: z.string().trim(),
});

// ใช้ superRefine สำหรับตรวจสอบว่า password และ confirmPassword ตรงกัน
export const signUpEmailPasswordConfirmSchema = emailPasswordConfirmSchema.superRefine(
  ({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  }
);

// Schema สำหรับข้อมูลอื่นๆ เช่น firstname, lastname, telephone และ student_id
export const otherInfoSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  telephone: z.string().min(10, { message: "Telephone is required" }),
  student_id: z.string().min(1, { message: "Student ID is required" }),
});

// ใช้ z.intersection รวมทั้งสอง schema
export const signUpSchema = z.intersection(
  signUpEmailPasswordConfirmSchema,
  otherInfoSchema
);

// Export types
export type SignUpSchema = z.infer<typeof signUpSchema>;
