"use server";

import { db } from "@/lib/db";
import { SignInSchema, signInSchema } from "@/validations/sign-in.validation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const signInActions = async (
   values: SignInSchema
): Promise<{
   success: boolean;
   message: string;
}> => {
   try {
      const result = signInSchema.safeParse(values);

      if (!result.success) {
         return { success: false, message: "Invalid credentials" };
      }

      const existingUser = await db.user.findUnique({
         where: {
            email: result.data.email,
         },
      });

      if (!existingUser) {
         return { success: false, message: "User does not exist" };
      }

      await signIn("credentials", {
         email: result.data.email,
         password: result.data.password,
         redirect: false,
      });

      return { success: true, message: "User created successfully" };
   } catch (error) {
      console.log("error", error);
      if (error instanceof AuthError) {
         switch (error.type) {
            case "CredentialsSignin":
               return {
                  success: false,
                  message: "Invalid credentials",
               };
            default:
               return {
                  success: false,
                  message: "Something went wrong",
               };
         }
      }

      return {
         success: false,
         message: "Internal server error",
      };
   }
};
