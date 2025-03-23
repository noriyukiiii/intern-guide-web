import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { AuthService } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { auth, isAdmin } = await AuthService.verifySession();
  const authPaths: string[] = ["/sign-in", "/sign-up", "/verify-email", "/forgot-password", "/reset-password", "/verification", "/verify"];
  const publicPaths: string[] = ["/", "/api/uploadthing", "/privacy-policy", "/verify"];
  // const homePaths: string[] = ["/"];
  const adminPaths: string[] = ["/admin", "/admin/company-list", "/admin/user-list"];
  const pathname: string = request.nextUrl.pathname;

  // console.log("Auth:", auth, "isAdmin:", isAdmin, "Pathname:", pathname);

  // const isHomeRoute = homePaths.includes(pathname);
  const isAdminRoute = adminPaths.includes(pathname);
  const isPublicRoute = publicPaths.includes(pathname);
  const isAuthRoute = authPaths.includes(pathname);

  // 1. จัดการเส้นทาง Auth
  if (isAuthRoute) {
    if (auth) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
  }

  // 2. จัดการเส้นทาง Admin
  if (isAdminRoute) {
    if (!auth || !isAdmin) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

  // 3. จัดการเส้นทาง Public
  if (isPublicRoute) {
    return NextResponse.next();
    
  }

  // 4. จัดการกรณีไม่มี Auth
  if (!auth) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

// กำหนด matcher สำหรับเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
