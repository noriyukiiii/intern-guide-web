import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { AuthService } from "./lib/auth";
import { isatty } from "tty";

export async function middleware(request: NextRequest) {
  const { auth, isAdmin } = await AuthService.verifySession();
  const authPaths: string[] = ["/sign-in", "/sign-up"];
  const publicPaths: string[] = ["/"];
  const adminPaths: string[] = ["/admin", "/admin/company-list"];
  const pathname: string = request.nextUrl.pathname;

  const isAdminRoute = adminPaths.includes(pathname);
  const isPublicRoute = publicPaths.includes(pathname);
  const isAuthRoute = authPaths.includes(pathname);

  if (isAuthRoute) {
    if (auth) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (isAdminRoute) {
    console.log("before is admin route : ", isAdmin)
    if (auth && !isAdmin) {
      console.log("IsAdmin : ",isAdmin)
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!auth && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

// กำหนด matcher สำหรับเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
