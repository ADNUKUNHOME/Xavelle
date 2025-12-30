import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import slugify from "slugify";

export async function GET(req: Request) {
  try {
    await connectDB();

    // 1. Professional Pagination & Filtering
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const products = await Product.find()
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
    await connectDB();
    const body = await req.json();

    // 2. Automated Slug Generation
    const slug = slugify(body.title, { lower: true, strict: true });

    // 3. Data Sanitization (Only allow specific fields)
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
      // Notice: we EXCLUDE rating and numReviews here so users can't fake them
    };

    const product = await Product.create(productData);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    // 4. Handle Duplicate Slugs (MongoDB Error 11000)
    if (error.code === 11000) {
      return NextResponse.json({ message: "Product title/slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}