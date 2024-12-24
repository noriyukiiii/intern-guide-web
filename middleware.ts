import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { AuthService } from "./lib/auth";

export async function middleware(request: NextRequest) {
    const isAuth: boolean = await AuthService.verifySession();
    const authPaths: string[] = ["/sign-in", "/sign-up"];
    const publicPaths: string[] = ["/"];
    const pathname: string = request.nextUrl.pathname;

    const isPublicRoute = publicPaths.includes(pathname);
    const isAuthRoute = authPaths.includes(pathname);

    if (isAuthRoute) {
        if (isAuth) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }

    if (!isAuth && !isPublicRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
