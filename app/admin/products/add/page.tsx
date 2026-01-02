'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product, Size } from '@/lib/types';
import { apiRequest } from '@/lib/api-client';

export default function AddProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Product>>({
        title: '', slug: '', description: '', price: 0,
        category: '', sizes: [], stock: 0, isFeatured: false, images: []
    });

    // Auto-generate slug from title
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            slug: (prev.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        }));
    }, [formData.title]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await apiRequest('/api/products', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            router.push('/admin/products');
            router.refresh();
        } catch (err) {
            alert("Error saving product. Check logs.");
        } finally {
            setLoading(false);
        }
    };

    const toggleSize = (size: Size) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes?.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...(prev.sizes || []), size]
        }));
    };

    return (
        <div className="max-w-4xl bg-white p-10 border border-neutral-200 shadow-sm mx-auto">
            <h2 className="text-xl font-light mb-10 uppercase tracking-widest">New Collection Entry</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase font-bold text-neutral-500">Product Title</label>
                        <input
                            required
                            className="border-b border-neutral-300 py-2 focus:border-black outline-none transition-colors"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase font-bold text-neutral-500">Slug (Auto)</label>
                        <input
                            readOnly
                            className="border-b border-neutral-100 py-2 text-neutral-400 outline-none"
                            value={formData.slug}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase font-bold text-neutral-500">Description</label>
                    <textarea
                        required
                        rows={4}
                        className="border border-neutral-200 p-3 focus:border-black outline-none transition-colors"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-3 gap-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase font-bold text-neutral-500">Price (USD)</label>
                        <input
                            type="number" required
                            className="border-b border-neutral-300 py-2 focus:border-black outline-none"
                            onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase font-bold text-neutral-500">Category</label>
                        <select
                            className="border-b border-neutral-300 py-2 focus:border-black outline-none bg-transparent"
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="">Select...</option>
                            <option value="Gown">Gown</option>
                            <option value="sarara">sarara</option>
                            <option value="Churudar">Churudar</option>
                            <option value="top">top</option>
                            <option value="Saree">Saree</option>
                            <option value="SKirt">SKirt</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase font-bold text-neutral-500">Stock Quantity</label>
                        <input
                            type="number" required
                            className="border-b border-neutral-300 py-2 focus:border-black outline-none"
                            onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-xs uppercase font-bold text-neutral-500">Available Sizes</label>
                    <div className="flex gap-2">
                        {(['XS', 'S', 'M', 'L', 'XL', 'XXL'] as Size[]).map(size => (
                            <button
                                key={size}
                                type="button"
                                onClick={() => toggleSize(size)}
                                className={`w-12 h-12 border text-xs transition-all ${formData.sizes?.includes(size) ? 'bg-black text-white border-black' : 'border-neutral-200 text-neutral-400'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4 py-4">
                    <input
                        type="checkbox"
                        id="featured"
                        className="w-4 h-4 accent-black"
                        onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                    />
                    <label htmlFor="featured" className="text-sm uppercase tracking-wide">Mark as Featured Product</label>
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-black text-white py-4 uppercase tracking-[0.2em] font-bold hover:bg-neutral-800 disabled:bg-neutral-300 transition-colors"
                >
                    {loading ? 'Processing...' : 'Publish Product'}
                </button>
            </form>
        </div>
    );
}