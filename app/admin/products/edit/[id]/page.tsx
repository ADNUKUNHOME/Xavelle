'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Product, Size } from "@/lib/types";
import { apiRequest } from "@/lib/api-client";

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Product>>({});

    const CATEGORIES = ["Gown", "Sarara", "Churudar", "Top", "Saree", "Skirt"];

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;
            try {
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) throw new Error();
                const data = await res.json();
                setFormData(data);
            } catch {
                alert("Failed to load product");
                router.push("/admin/products");
            }
        };

        loadProduct();
    }, [id, router]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await apiRequest(`/api/products/${id}`, {
                method: "PUT",
                body: JSON.stringify(formData),
            });

            router.push("/admin/products");
            router.refresh();
        } catch {
            alert("Failed to update product");
        } finally {
            setLoading(false);
        }
    };

    const toggleSize = (size: Size) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes?.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...(prev.sizes || []), size],
        }));
    };

    if (!formData.title) return <p className="p-10">Loading...</p>;

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-10 space-y-8 bg-white border">
            <h2 className="text-xl uppercase tracking-widest">Edit Product</h2>

            <input
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="border-b w-full py-2"
            />

            <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="border w-full p-3"
            />

            <input
                type="number"
                value={formData.price || ""}
                onChange={e =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                }
                placeholder="Price"
                className="border w-full p-2"
            />

            <input
                type="number"
                value={formData.stock || ""}
                onChange={e =>
                    setFormData({ ...formData, stock: Number(e.target.value) })
                }
                placeholder="Stock"
                className="border w-full p-2"
            />

            <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold text-neutral-500">
                    Category
                </label>

                <select
                    value={formData.category || ""}
                    onChange={e =>
                        setFormData({ ...formData, category: e.target.value })
                    }
                    className="border-b border-neutral-300 py-2 focus:border-black outline-none bg-transparent"
                    required
                >
                    {
                        CATEGORIES.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))
                    }
                </select>
            </div>


            <div className="flex gap-3 flex-wrap">
                {["XS", "S", "M", "L", "XL", "XXL"].map(size => (
                    <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size as Size)}
                        className={`px-4 py-1 border text-sm ${formData.sizes?.includes(size as Size)
                            ? "bg-black text-white"
                            : ""
                            }`}
                    >
                        {size}
                    </button>
                ))}
            </div>

            <button
                disabled={loading}
                className="w-full bg-black text-white py-3 uppercase tracking-widest"
            >
                {loading ? "Updating..." : "Update Product"}
            </button>
        </form>
    );
}
