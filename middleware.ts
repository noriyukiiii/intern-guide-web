import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { AuthService } from "./lib/auth";

export async function middleware(request: NextRequest) {
  // ตรวจสอบว่า session มีอยู่และผู้ใช้ล็อกอิน
  const isAuth: boolean = await AuthService.verifySession();
  const authPaths: string[] = ["/sign-in", "/sign-up"];
  const publicPaths: string[] = ["/"];
  const pathname: string = request.nextUrl.pathname;
  const isPublicRoute = publicPaths.includes(pathname);
  const isAuthRoute = authPaths.includes(pathname);


  // กรณีที่ต้องการให้เฉพาะผู้ใช้ที่ล็อกอินแล้วเข้าถึง
  if (!isAuth && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));  // ถ้ายังไม่ได้ล็อกอินให้ไปหน้า sign-in
  }

  // กรณีที่ผู้ใช้ล็อกอินแล้วไม่ให้เข้าถึงหน้าลงทะเบียน
  if (isAuthRoute && isAuth) {
    return NextResponse.redirect(new URL("/", request.url));  // ถ้าล็อกอินแล้วไปหน้า Home
  }

  return NextResponse.next();
}

// กำหนด matcher สำหรับเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};