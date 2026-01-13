'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

export default function ProductsToolbar() {
    const router = useRouter();
    const params = useSearchParams();

    const updateSort = (value: string) => {
        const q = new URLSearchParams(params.toString());
        q.set('sort', value);
        router.push(`?${q.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">
                <SlidersHorizontal size={14} />
                <span>Filter & Refine</span>
            </div>

            <div className="flex items-center gap-8">
                <div className="relative group">
                    <select
                        onChange={(e) => updateSort(e.target.value)}
                        className="appearance-none bg-transparent pr-8 py-1 text-sm font-medium border-b border-zinc-200 focus:border-zinc-900 outline-none cursor-pointer transition-colors"
                    >
                        <option value="new">Newest Arrivals</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400" size={14} />
                </div>
            </div>
        </div>
    );
}