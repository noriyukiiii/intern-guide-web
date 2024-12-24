"use server";

import { AuthService } from "@/lib/auth";
import { db } from "@/lib/db";
import { SignInSchema, signInSchema } from "@/validations/sign-in.validation";
import { SignUpSchema, signUpSchema } from "@/validations/sign-up.validation";
import { compareSync, hashSync } from "bcryptjs";
import { revalidatePath } from "next/cache";

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

        const { 
            email,
            password,
            firstname,
            lastname,
            telephone,
            student_id 
        } = validation.data;

        const existingUser = await db.user.findUnique({ where: { email } });

        if (existingUser) {
            return {
                success: false,
                message: "User already exists",
            };
        }

        const hashedPassword = hashSync(password, 10);
        const user = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName: firstname,
                lastName: lastname,
                phone: telephone,
                studentId: student_id,
                role: "MEMBER",
            },
        });

        revalidatePath("/");
        return {
            success: true,
            message: "Login Successfully",
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

        await AuthService.createSessionCookies(user.id);
        revalidatePath("/");
        return {
            success: true,
            message: "login successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: "Internal Server Error",
        };
    }
}

export async function signOutActions() {
    await AuthService.clearSession();
    revalidatePath("/");
}
