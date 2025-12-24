import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  const token = req.cookies.get("token")?.value;

  // Helper: redirect to login
  const redirectToLogin = () => {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  };

  // Public routes
  const publicRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];

  // Allow static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // If no token → allow only public routes
  if (!token) {
    if (publicRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.next();
    }
    return redirectToLogin();
  }

  // If token exists and trying to access auth pages, redirect to appropriate dashboard
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    // We can't check user type without verifying token
    // Redirect to a generic dashboard or let the backend decide
    url.pathname = "/admin/dashboard"; // Default redirect
    return NextResponse.redirect(url);
  }

  // Token exists and trying to access protected routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/employee/:path*"],
};