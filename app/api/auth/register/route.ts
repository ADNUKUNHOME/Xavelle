import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/user";
import { connectDB } from "@/lib/db";
import { hashPassword } from "@/lib/hash";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { name, email, password, role } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 }
            );
        }

        const hashedPassword = await hashPassword(password);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "admin",
        });

        return NextResponse.json(
            { message: "Admin registered successfully" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Registration failed" },
            { status: 500 }
        );
    }
}
