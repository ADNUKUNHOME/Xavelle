"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddToCartButton({ productId }: { productId: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const addToCart = async () => {
        setLoading(true);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ productId, quantity: 1 }),
            }
        );

        setLoading(false);

        if (res.ok) {
            router.push("/cart");
        }
    };

    return (
        <button
            onClick={addToCart}
            disabled={loading}
            className="px-8 py-3 rounded-full bg-black text-white text-sm font-medium tracking-wide hover:opacity-90 disabled:opacity-50"
        >
            {loading ? "Adding..." : "Add to Cart"}
        </button>
    );
}
