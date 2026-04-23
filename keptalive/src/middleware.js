import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("shopify_customer_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  const { pathname } = req.nextUrl;

  try {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return NextResponse.redirect(new URL("/Login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/checkout/:path*", "/Profile/:path*"],
};