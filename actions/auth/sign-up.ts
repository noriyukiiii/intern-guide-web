"use server";

import { db } from "@/lib/db";
import { signUpSchema, SignUpSchema } from "@/validations/sign-up.validation";
import bcryptjs from "bcryptjs";

export const signUp = async (values: SignUpSchema): Promise<{
   success: boolean;
   message: string;
}> => {
   try {
      const result = signUpSchema.safeParse(values);

      if (!result.success) {
         return { success: false, message: "Invalid credentials" };
      }

      const user = await db.user.findUnique({
         where: {
            email: result.data.email,
         },
      });

      if (user) {
         return { success: false, message: "User already exists" };
      }

      const hashedPassword = await bcryptjs.hash(result.data.password, 10);

      await db.user.create({
         data: {
            email: result.data.email,
            password: hashedPassword,
            firstName: result.data.firstname,
            lastName: result.data.lastname,
            phone: result.data.telephone,
            studentId: result.data.student_id,
         }
      })

      return { success: true, message: "User created successfully" };
   } catch (error) {
      return { success: false, message: "Internal server error" };
   }
}