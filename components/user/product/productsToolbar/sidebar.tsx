'use client';

import { Slider } from '@/components/ui/slider';
import { useFilters } from '@/contexts/filterContext';

export default function Sidebar() {
    const {
        categories,
        selectedCategories,
        toggleCategory,
        priceRange,
        setPriceRange,
        clearFilters,
        sortBy,
        setSortBy
    } = useFilters();

    return (
        <div className="space-y-8">
            {/* Categories */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-900">Categories</h3>
                <div className="space-y-3">
                    {categories.map(category => (
                        <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category.id)}
                                onChange={() => toggleCategory(category.id)}
                                className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                            />
                            <span className="text-neutral-700">{category.name}</span>
                            <span className="text-neutral-400 text-sm">({category.count})</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-neutral-900">Price Range</h3>
                <div className="space-y-4">
                    <Slider
                        min={0}
                        max={10000}
                        step={100}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-neutral-600">
                        <span>₹{priceRange[0].toLocaleString()}</span>
                        <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Sorting */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-900">Sort By</h3>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                >
                    <option value="newest">Newest Arrivals</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                </select>
            </div>

            {/* Clear Filters */}
            {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 10000) && (
                <button
                    onClick={clearFilters}
                    className="w-full py-3 text-center text-neutral-600 hover:text-neutral-900 border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors"
                >
                    Clear All Filters
                </button>
            )}
        </div>
    );
}