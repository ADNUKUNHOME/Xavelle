import { NextResponse } from "next/server";

/**
 * Temporary category source
 * Later you can replace this with DB (Mongo / Prisma / etc.)
 */
const CATEGORIES = [
    { id: "Saree", name: "Saree", count: 24 },
    { id: "Sarara", name: "Sarara", count: 18 },
    { id: "Churudar", name: "Churudar", count: 32 },
    { id: "Maxi", name: "Maxi", count: 15 },
    { id: "Masli", name: "Masli", count: 21 },
    { id: "Party", name: "Party", count: 12 },
    { id: "Gown", name: "Gown", count: 9 },
];

export async function GET() {
    try {
        // Simulate DB latency (optional – remove later)
        await new Promise((resolve) => setTimeout(resolve, 200));

        return NextResponse.json(CATEGORIES, { status: 200 });
    } catch (error) {
        console.error("Categories API error:", error);

        return NextResponse.json(
            { message: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}
