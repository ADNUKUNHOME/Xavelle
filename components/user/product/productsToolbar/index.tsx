'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFilters } from '@/contexts/filterContext';
import Sidebar from './sidebar';
import MobileAndSort from './mobileAndSort';
import Pagination from './pagination';
import FilterDrawer from './filterDrawer';

export { Sidebar, MobileAndSort, Pagination, FilterDrawer };

export default function ProductsToolbar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { sortBy, setSortBy, selectedCategories, priceRange, mobileFiltersOpen, setMobileFiltersOpen } = useFilters();

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (selectedCategories.length > 0) {
            params.set('category', selectedCategories.join(','));
        } else {
            params.delete('category');
        }

        params.set('minPrice', priceRange[0].toString());
        params.set('maxPrice', priceRange[1].toString());
        params.set('sort', sortBy);
        params.set('page', '1');

        router.push(`?${params.toString()}`);
    };

    return (
        <>
            <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-40 bg-neutral-900 text-white p-4 rounded-full shadow-xl hover:bg-neutral-800 transition-all"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
            </button>

            <FilterDrawer
                isOpen={mobileFiltersOpen}
                onClose={() => setMobileFiltersOpen(false)}
                onApply={applyFilters}
            />
        </>
    );
}