import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/user";
import { connectDB } from "@/lib/db";
import { comparePassword } from "@/lib/hash";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = signToken({
            userId: user._id.toString(),
            role: user.role,
        });

        const response = NextResponse.json({
            message: "Login successful",
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch {
        return NextResponse.json(
            { message: "Login failed" },
            { status: 500 }
        );
    }
}
