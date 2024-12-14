import { z } from "zod";

export const signUpSchema = z.object({
   email: z.string().email(),
   password: z.string().min(8),
   confirmPassword: z.string().min(8),
   lastname: z.string().min(1, {message: "Last name is required"}),
   firstname: z.string().min(1, {message: "First name is required"}),
   telephone: z.string().min(10, {message: "Telephone is required"}),
   student_id: z.string().min(1, {message: "Student ID is required"}),
}).superRefine(({password, confirmPassword}, ctx) => {
   if (password !== confirmPassword) {
      ctx.addIssue({
         code: z.ZodIssueCode.custom,
         message: "Passwords do not match",
         path: ["confirmPassword"],
      })
   }
})

export type SignUpSchema = z.infer<typeof signUpSchema>;