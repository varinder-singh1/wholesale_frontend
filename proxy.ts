import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("loggedIn")?.value;
  const { pathname } = request.nextUrl;

  // ✅ public routes (NO login required)
  const publicRoutes = [
    "/login",
    "/sign-in",
    "/signup",
    "/forgot-password",
    "/request-send-successfully",
    "/term-condtion",
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 🔒 If NOT logged in AND trying to access protected route
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔁 If logged in AND trying to go login pages
  if (token && (pathname === "/login" || pathname === "/sign-in")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}