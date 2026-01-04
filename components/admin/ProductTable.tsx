'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { apiRequest } from "@/lib/api-client";

export default function ProductTable({ products }: { products: Product[] }) {
    const router = useRouter();

    const handleDelete = async (id: string) => {
        const confirmed = confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;

        await apiRequest(`/api/products/${id}`, {
            method: "DELETE",
        });

        router.refresh();
    };

    return (
        <div className="bg-white border border-neutral-200 rounded-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                        <th className="p-4 text-xs uppercase tracking-widest font-semibold text-neutral-500">
                            Product
                        </th>
                        <th className="p-4 text-xs uppercase tracking-widest font-semibold text-neutral-500">
                            Category
                        </th>
                        <th className="p-4 text-xs uppercase tracking-widest font-semibold text-neutral-500">
                            Price
                        </th>
                        <th className="p-4 text-xs uppercase tracking-widest font-semibold text-neutral-500">
                            Stock
                        </th>
                        <th className="p-4 text-xs uppercase tracking-widest font-semibold text-neutral-500">
                            Status
                        </th>
                        <th className="p-4 text-xs uppercase tracking-widest font-semibold text-neutral-500">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-neutral-100">
                    {products.map((product) => (
                        <tr
                            key={product._id}
                            className="hover:bg-neutral-50/50 transition-colors"
                        >
                            <td className="p-4 flex items-center gap-4">
                                <div className="relative w-12 h-16 bg-neutral-100 overflow-hidden">
                                    {product.images?.[0] && (
                                        <Image
                                            src={product.images[0]}
                                            alt={product.title}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                                <span className="font-medium text-sm">
                                    {product.title}
                                </span>
                            </td>

                            <td className="p-4 text-sm text-neutral-600">
                                {product.category}
                            </td>

                            <td className="p-4 text-sm font-mono">
                                ${product.price.toFixed(2)}
                            </td>

                            <td className="p-4 text-sm">
                                {product.stock}
                            </td>

                            <td className="p-4">
                                {product.isFeatured && (
                                    <span className="text-[10px] px-2 py-1 bg-black text-white uppercase tracking-tighter">
                                        Featured
                                    </span>
                                )}
                            </td>

                            <td className="p-4 flex gap-3">
                                <button
                                    onClick={() =>
                                        router.push(`/admin/products/edit/${product._id}`)
                                    }
                                    className="text-xs uppercase tracking-wide border px-3 py-1 hover:bg-black hover:text-white transition"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="text-xs uppercase tracking-wide border px-3 py-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
