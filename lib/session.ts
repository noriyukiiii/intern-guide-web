import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload : JWTPayload) {
    return new SignJWT(payload)
    .setProtectedHeader({alg : "HS256"})
    .setIssuedAt()
    .setExpirationTime("30m")  // เปลี่ยนเวลาเป็น 5 นาที
    .sign(encodedKey)
}


export async function decrypt(session: any): Promise<JWTPayload | null> {
    try {
      const { payload } = await jwtVerify(session as string, encodedKey, {
        algorithms: ['HS256'],
      });
      return payload;
    } catch (error) {
      console.log("Failed to verify session", error);
      return null;
    }
  }
  
export async function createSession(userId:any) {
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // ตั้งเวลาหมดอายุเป็น 5 นาที
    const session = await encrypt({userId, expiresAt})
    const cookieStore = await cookies()  

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: false,
        expires:expiresAt,
        sameSite: "lax",
        path: "/",
    });
}

