import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { getUserById as fetchUserById } from "@/actions/getuser"; // เปลี่ยนชื่อ import

// ประเภทของ Session
interface Session {
  userId: string;
  [key: string]: any; // กรณีมีฟิลด์เพิ่มเติม
}

// ประเภทของ User
interface User {
    user_id: string;
    email: string;
    firstname: string;
    lastname: string;
    telephone: string;
    student_id: string;
  }
// ฟังก์ชันสำหรับดึง session cookie
async function getSessionCookie(): Promise<string> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  if (!sessionCookie || !sessionCookie.value) {
    throw new Error("Session cookie not found");
  }
  return sessionCookie.value;
}

// ฟังก์ชันสำหรับถอดรหัส session
async function decryptSession(cookieValue: string): Promise<Session> {
  const session = await decrypt(cookieValue);
  if (!session || !session.userId) {
    throw new Error("Invalid session or missing userId");
  }
  return session as Session;
}

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
async function fetchUserBySession(session: Session): Promise<User> {
  const user = await fetchUserById(session.userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user as User;
}

// ฟังก์ชันหลักที่รวมการตรวจสอบ session และดึงข้อมูลผู้ใช้
async function getAuthenticatedUser(): Promise<User> {
  const cookieValue = await getSessionCookie();
  const session = await decryptSession(cookieValue);
  const user = await fetchUserBySession(session);
  return user;
}

export default getAuthenticatedUser;
