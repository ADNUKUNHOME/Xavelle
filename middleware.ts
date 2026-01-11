import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    /* -------------------------------
       AUTH PAGES (login / register)
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

        try {
            const decoded = verifyToken(token);

            if (decoded.role !== "admin") {
                return NextResponse.redirect(new URL("/", req.url));
            }
        } catch {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    /* -------------------------------
       USER PROTECTED ROUTES
    -------------------------------- */
    if (
        ["/cart", "/checkout"].includes(pathname) &&
        !token
    ) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/admin/:path*",
        "/cart",
        "/checkout",
    ],
};
