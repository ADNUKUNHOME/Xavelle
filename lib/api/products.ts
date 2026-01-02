import { ProductsResponse } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function getAllProducts(): Promise<ProductsResponse> {
    const res = await fetch(`${API_BASE}/api/products`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}
