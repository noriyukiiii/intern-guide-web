"use server";

import { Prisma } from "@prisma/client";
import { db } from "../lib/db";
import { SignUpSchema } from "@/validations/sign-up.validation";

export const signUpAction = async (
   data: SignUpSchema,
   options?: {
      onSuccess?: () => void;
   }
): Promise<{ success: boolean; error?: string }> => {
   try {
      const user = await db.user.findUnique({
         where: {
            email: data.email,
         }
      })

      if (user) {
         return { success: false, error: "User already exists" };
      }

      await db.user.create({
         data: {
            email: data.email,
            password: data.password,
            firstname: data.firstname,
            lastname: data.lastname,
            telephone: data.telephone,
            student_id: data.student_id,
         },
      });

      if (options?.onSuccess) {
         options.onSuccess();
      }

      return { success: true, error: undefined };
   } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
         return { success: false, error: error.message };
      }

      return { success: false, error: "Failed to create user" };
   }
}