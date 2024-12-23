import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";


const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30m")  // เปลี่ยนเวลาเป็น 30 นาที
        .sign(encodedKey);
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

export async function createSession(userId: any) {
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // ตั้งเวลาหมดอายุเป็น 30 นาที
    const session = await encrypt({ userId, expiresAt });
    const cookieStore = await cookies();

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // ใช้ใน production เท่านั้น
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
}

// ฟังก์ชันดึงข้อมูล firstname จาก session

export async function getUserDetailsFromCookie() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
  
    if (!sessionCookie || !sessionCookie.value) {
      throw new Error("No session cookie found");
    }
  
    const userDetails = await decrypt(sessionCookie.value);
  
    if (!userDetails) {
      throw new Error("Failed to decrypt session");
    }
  
    const { userId } = userDetails;  // ดึง userId จาก session payload
  
    // ตรวจสอบให้แน่ใจว่า userId เป็น string
    if (typeof userId !== 'string') {
      throw new Error("Invalid userId type");
    }
  
    console.log(userId);
    return userId;
  }

  export async function Checkcookie() {
    try {
      const cookieStore = await cookies();
      const sessionCookie = cookieStore.get("session");
  
      if (!sessionCookie || !sessionCookie.value) {
        return false; // ไม่มีคุกกี้
      }
  
      const userDetails = await decrypt(sessionCookie.value);
  
      if (!userDetails) {
        return false; // ถอดรหัสไม่สำเร็จ
      }
  
      return true; // ตรวจสอบคุกกี้สำเร็จ
    } catch (error) {
      console.error("Error checking cookie:", error);
      return false; // มีข้อผิดพลาด
    }
  }