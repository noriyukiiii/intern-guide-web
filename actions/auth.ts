"use server";

import { AuthService } from "@/lib/auth";
import { db } from "@/lib/db";
import { SignInSchema, signInSchema } from "@/validations/sign-in.validation";
import { SignUpSchema, signUpSchema } from "@/validations/sign-up.validation";
import { compareSync, hashSync } from "bcryptjs";
import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { sendVerificationEmail } from "@/lib/mailer";
import axios from "axios";

export async function signUpActions(values: SignUpSchema): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const validation = signUpSchema.safeParse(values);
    if (!validation.success) {
      return { success: false, message: "Bad Request" };
    }

    const { email, password, firstname, lastname, telephone, student_id } = validation.data;

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const verificationToken = randomBytes(16).toString("hex");
    const hashedPassword = await hashSync(password, 10);

    // ทำให้การสร้างบัญชีและส่งอีเมลทำงานพร้อมกัน
    const [userResult, emailResult] = await Promise.allSettled([
      db.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName: firstname,
          lastName: lastname,
          phone: telephone,
          studentId: student_id,
          image: "/userimage/boy.png",
          role: "MEMBER",
          verificationToken,
        },
      }),
      axios.post(`${process.env.NEXT_PUBLIC_BASE_RES_API}/user/send-verify-email`, {
        token: verificationToken,
        email,
        firstname,
        lastname,
      }),
    ]);

    if (userResult.status === "rejected") {
      console.error("Failed to create user:", userResult.reason);
      return { success: false, message: "Failed to create user" };
    }

    if (emailResult.status === "rejected") {
      console.error("Failed to send verification email:", emailResult.reason);
    }

    revalidatePath("/");

    return {
      success: true,
      message: "Register successfully. Please check your email to verify your account.",
    };
  } catch (error) {
    console.error("Sign-up error:", error);
    return { success: false, message: "Internal Server Error" };
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

    if (!user) {
      return {
        success: false,
        message: "ไม่มีผู้ใช้งานนี้ในระบบ",
      };
    }

    // ✅ เช็คว่า email ถูก verify หรือยัง
    if (!user.emailVerified) {
      return {
        success: false,
        message: "กรุณายืนยันอีเมลก่อน",
      };
    }

    if (!user || !compareSync(password, user.password ?? "")) {
      return {
        success: false,
        message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
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
      message: "เข้าสู่ระบบสำเร็จ",
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_RES_API}/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

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
