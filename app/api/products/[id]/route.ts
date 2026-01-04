import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { NextResponse } from "next/server";
import slugify from "slugify";

/* ---------------- GET PRODUCT ---------------- */
export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await context.params;

        if (!id) {
            return NextResponse.json(
                { error: "Invalid product ID" },
                { status: 400 }
            );
        }

        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

/* ---------------- UPDATE PRODUCT ---------------- */
export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await context.params;
        const data = await req.json();

        if (!data.images || data.images.length === 0) {
            return NextResponse.json(
                { error: "At least one image is required." },
                { status: 400 }
            );
        }

        const updatedData = {
            ...data,
            slug: slugify(data.title, { lower: true, strict: true }),
        };

        const product = await Product.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

/* ---------------- DELETE PRODUCT ---------------- */
export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await context.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Product deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
