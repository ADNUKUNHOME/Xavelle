import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";

interface GetProductsOptions {
    page?: number;
    limit?: number;
}

export async function getProducts({
    page = 1,
    limit = 20,
}: GetProductsOptions = {}) {
    await connectDB();

    const skip = (page - 1) * limit;

    const products = await Product.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    const total = await Product.countDocuments();

    return {
        products,
        pagination: {
            total,
            page,
            pages: Math.ceil(total / limit),
        },
    };
}

export async function getProductStats() {
    await connectDB();

    const total = await Product.countDocuments();
    const featured = await Product.countDocuments({ isFeatured: true });
    const outOfStock = await Product.countDocuments({ stock: 0 });

    return {
        total,
        featured,
        outOfStock,
    };
}
