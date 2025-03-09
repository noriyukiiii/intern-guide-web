"use server";

import { AuthService } from "@/lib/auth";
import { db } from "@/lib/db";
import { SignInSchema, signInSchema } from "@/validations/sign-in.validation";
import { SignUpSchema, signUpSchema } from "@/validations/sign-up.validation";
import { compareSync, hashSync } from "bcryptjs";
import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { sendVerificationEmail } from "@/lib/mailer";

export async function signUpActions(values: SignUpSchema): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const validation = signUpSchema.safeParse(values);

    if (!validation.success) {
      return {
        success: false,
        message: "Bad Request",
      };
    }

    const { email, password, firstname, lastname, telephone, student_id } =
      validation.data;

    const existingUser = await db.user.findUnique({ where: { email } });

    if (existingUser) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    // สร้าง verificationToken
    const verificationToken = randomBytes(16).toString("hex");

    const hashedPassword = hashSync(password, 10);
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: firstname,
        lastName: lastname,
        phone: telephone,
        studentId: student_id,
        image: "/userimage/boy.png",
        role: "MEMBER",
        verificationToken, // บันทึก token
      },
    });

    // ส่งอีเมลยืนยัน
    await sendVerificationEmail(email, verificationToken);

    revalidatePath("/");

    return {
      success: true,
      message:
        "Register successfully. Please check your email to verify your account.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
}

export async function signInActions(values: SignInSchema): Promise<{
  success: boolean;
  message: string;
  redirectTo?: string;
}> {
  try {
    const validation = signInSchema.safeParse(values);

    if (!validation.success) {
      return {
        success: false,
        message: "Bad Request",
      };
    }

    const { email, password } = validation.data;

    const user = await db.user.findUnique({ where: { email } });

    if (!user || !compareSync(password, user.password ?? "")) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    // ✅ เช็คว่า email ถูก verify หรือยัง
    if (!user.emailVerified) {
      return {
        success: false,
        message: "กรุณายืนยันอีเมลก่อน",
      };
    }

    await AuthService.createSessionCookies(user.id, user.role);

    let redirectTo = "/";
    if (user.role === "ADMIN") {
      redirectTo = "/admin/dashboard";
    } else if (user.role === "MEMBER") {
      redirectTo = "/";
    }

    revalidatePath(redirectTo);

    return {
      success: true,
      message: "Login successfully",
      redirectTo,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
}

export const resetPasswordActions = async ({ email }: { email: string }) => {
  try {
    const res = await fetch("intern-server-noriyukiiii-noriyukiiiis-projects.vercel.app/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" };
  }
};

export async function signOutActions() {
  await AuthService.clearSession();
  revalidatePath("/");
}
