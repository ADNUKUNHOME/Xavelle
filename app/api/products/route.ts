import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import slugify from "slugify";
import { requireAdmin } from "@/lib/authGuard";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .select("title slug price images category isFeatured createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);


    const total = await Product.countDocuments();

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    await connectDB();
    const body = await req.json();

    if (!body.images || body.images.length === 0) {
      return NextResponse.json({
        message: "Product must have atleast one image!"
      }, { status: 400 });
    };

    const slug = slugify(body.title, { lower: true, strict: true });

    const productData = {
      title: body.title,
      slug: slug,
      description: body.description,
      price: body.price,
      category: body.category,
      images: body.images,
      sizes: body.sizes,
      stock: body.stock,
      isFeatured: body.isFeatured || false,
    };

    const product = await Product.create(productData);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("❌ Product creation error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }

}