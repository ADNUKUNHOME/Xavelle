'use client';

import { useFilters } from '@/contexts/filterContext';

export default function MobileAndSort() {
    const { sortBy, setSortBy, selectedCategories, setMobileFiltersOpen } = useFilters();

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
                {selectedCategories.map(category => (
                    <span
                        key={category}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-neutral-100 text-neutral-700"
                    >
                        {category}
                        <button
                            onClick={() => {/* Handle remove */ }}
                            className="ml-2 hover:text-neutral-900"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>

            {/* Sort & Filter Button */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center space-x-2 px-4 py-2.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <span>Filters</span>
                </button>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2.5 rounded-lg border border-neutral-200 bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                >
                    <option value="newest">Newest Arrivals</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                </select>
            </div>
        </div>
    );
}