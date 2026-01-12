"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartPage() {
    const [cart, setCart] = useState<any>(null);

    const fetchCart = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/cart`,
            { credentials: "include" }
        );
        const data = await res.json();
        setCart(data);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQty = async (productId: string, quantity: number) => {
        await fetch(`/api/user/cart`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ productId, quantity }),
        });
        fetchCart();
    };

    const removeItem = async (productId: string) => {
        await fetch(`/api/user/cart`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ productId }),
        });
        fetchCart();
    };

    if (!cart) return null;

    const total = cart.items.reduce(
        (sum: number, item: any) =>
            sum + item.product.price * item.quantity,
        0
    );

    return (
        <section className="max-w-6xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-bold mb-10">Your Cart</h1>

            {cart.items.length === 0 && (
                <p className="text-muted-foreground">Your cart is empty.</p>
            )}

            <div className="space-y-6">
                {cart.items.map((item: any) => (
                    <div
                        key={item.product._id}
                        className="flex items-center gap-6 border-b pb-6"
                    >
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                            <Image
                                src={item.product.images[0]}
                                alt={item.product.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <h2 className="font-semibold">{item.product.title}</h2>
                            <p className="text-sm text-muted-foreground">
                                ₹{item.product.price}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button onClick={() => updateQty(item.product._id, item.quantity - 1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQty(item.product._id, item.quantity + 1)}>+</button>
                        </div>

                        <button
                            onClick={() => removeItem(item.product._id)}
                            className="text-sm text-red-500"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex justify-between items-center">
                <p className="text-xl font-semibold">Total: ₹{total}</p>
                <button className="px-8 py-3 bg-black text-white rounded-full">
                    Checkout
                </button>
            </div>
        </section>
    );
}
