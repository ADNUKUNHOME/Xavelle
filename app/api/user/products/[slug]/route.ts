import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();

        const { slug } = await params;

        const product = await Product.findOne({ slug }).select(
            "title slug price images description category"
        );

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json(
            { message: "Failed to fetch product" },
            { status: 500 }
        );
    }
}
