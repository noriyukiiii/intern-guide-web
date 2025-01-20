import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "./db";

const SECRET_KEY = new TextEncoder().encode("rSTEz70TExZ4tDYrJnWxCLC9+zI=");
const SESSION_COOKIE = "auth_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export class AuthService {
    static async createSessionCookies(userId: string, userrole: string) {
        const token = await new SignJWT({ userId, userrole})
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("30d")
            .sign(SECRET_KEY);

        const expires = new Date();
        expires.setTime(expires.getTime() + COOKIE_MAX_AGE * 1000);

        await db.session.create({
            data: {
                token,
                expiresAt: expires,
                userId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        });

        (await cookies()).set(SESSION_COOKIE, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires,
        });
    }

    static async getCurrentUser() {
        try {
            const token = (await cookies()).get(SESSION_COOKIE)?.value;
            if (!token) return null;

            const { payload } = await jwtVerify(token, SECRET_KEY);
            if (!payload.userId) return null;

            const session = await db.session.findFirst({
                where: {
                    token,
                    expiresAt: { gt: new Date() },
                },
                include: { user: true },
            });

            if (!session) return null;

            const { password, ...user } = session.user;

            return user;
        } catch (error) {
            console.error("Failed to get current user", error);
            return null;
        }
    }

    static async clearSession() {
        const token = (await cookies()).get(SESSION_COOKIE)?.value;

        if (token) {
            await db.session.delete({ where: { token } });
            (await cookies()).delete(SESSION_COOKIE);
        }
    }

    static async verifySession() :Promise<
    {
        auth: boolean,
        isAdmin: boolean
    }
    > {
        const token = (await cookies()).get(SESSION_COOKIE)?.value;
        if (!token) {
            return {
                auth : false,
                isAdmin: false
            }
        }

        try {
            const Session = await jwtVerify(token, SECRET_KEY);
            return {
                auth : true,
                isAdmin: Session.payload.userrole === "ADMIN"
            };
        } catch (error) {
            return {
                auth : false,
                isAdmin: false
            };
        }
    }
}

// เพิ่มฟังก์ชัน getSession
export async function getSession() {
    try {
      const token = (await cookies()).get(SESSION_COOKIE)?.value;
      if (!token) {
        return null;
      }
  
      const user = await AuthService.getCurrentUser();
      if (!user) {
        return null;
      }
  
      return { user };
    } catch (error) {
      console.error("Failed to get session", error);
      return null;
    }
  }