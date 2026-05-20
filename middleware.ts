import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log("---------------MIDDLEWARE RUNNING:", request.nextUrl.pathname);
  const isAuthPage = request.nextUrl.pathname === "/login";

  // If NOT logged in and NOT on login page → redirect to login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If logged in and trying to access login → redirect to dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes except static files & api
export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};