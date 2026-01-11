import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    /* -------------------------------
       AUTH PAGES
    -------------------------------- */
    if (token && (pathname === "/login" || pathname === "/register")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    /* -------------------------------
       ADMIN ROUTES
    -------------------------------- */
    if (pathname.startsWith("/admin")) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    /* -------------------------------
       USER PROTECTED ROUTES
    -------------------------------- */
    if (["/user/cart", "/checkout"].includes(pathname)) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/admin/:path*",
        "/user/cart",
        "/checkout",
    ],
};
