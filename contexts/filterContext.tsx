'use client';

import { Category } from '@/lib/types';
import React, { createContext, useContext, useState, useCallback } from 'react';

interface FilterContextType {
    selectedCategories: string[];
    toggleCategory: (category: string) => void;
    clearFilters: () => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    categories: Category[];
    mobileFiltersOpen: boolean;
    setMobileFiltersOpen: (open: boolean) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({
    children,
    initialCategories = [],
    initialFilters
}: {
    children: React.ReactNode;
    initialCategories?: Category[];
    initialFilters?: any;
}) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([
        initialFilters?.priceRange?.min || 0,
        initialFilters?.priceRange?.max || 10000
    ]);
    const [sortBy, setSortBy] = useState('newest');
    const [categories] = useState<Category[]>(initialCategories);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const toggleCategory = useCallback((category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    }, []);

    const clearFilters = useCallback(() => {
        setSelectedCategories([]);
        setPriceRange([
            initialFilters?.priceRange?.min || 0,
            initialFilters?.priceRange?.max || 10000
        ]);
        setSortBy('newest');
    }, [initialFilters]);

    return (
        <FilterContext.Provider value={{
            selectedCategories,
            toggleCategory,
            clearFilters,
            priceRange,
            setPriceRange,
            sortBy,
            setSortBy,
            categories,
            mobileFiltersOpen,
            setMobileFiltersOpen,
        }}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilters() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
}