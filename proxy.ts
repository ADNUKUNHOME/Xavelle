import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export default function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/admin")) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        try {
            const decoded = verifyToken(token);

            if (decoded.role !== "admin") {
                return NextResponse.redirect(new URL("/", req.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
