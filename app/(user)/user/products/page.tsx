import Breadcrumbs from '@/components/user/product/breadCrumbs';
import ProductsGrid from '@/components/user/product/productsGrid';
import ProductsHero from '@/components/user/product/productsHero';
import MobileAndSort from '@/components/user/product/productsToolbar/mobileAndSort';
import Pagination from '@/components/user/product/productsToolbar/pagination';
import Sidebar from '@/components/user/product/productsToolbar/sidebar';
import { FilterProvider } from '@/contexts/filterContext';
import { getCategories, getProducts } from '@/lib/api/products';
import { Suspense } from 'react';


interface ProductsPageProps {
    searchParams: {
        mode?: "shop" | "explore";
        category?: string;
        sort?: string;
        minPrice?: string;
        maxPrice?: string;
        page?: string;
        search?: string;
    };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const resolvedSearchParams = await searchParams;
    const mode = resolvedSearchParams.mode || 'shop';
    const [{ products, total, page, totalPages, filters }, categories] = await Promise.all([
        getProducts(resolvedSearchParams),
        getCategories()
    ]);

    return (
        <FilterProvider initialCategories={categories} initialFilters={filters}>
            <div className="min-h-screen bg-linear-to-b from-white to-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Breadcrumbs category={resolvedSearchParams.category} />

                    <ProductsHero totalProducts={total} />

                    <div
                        className={`grid grid-cols-1 gap-12 mt-12 ${mode === "shop" ? "lg:grid-cols-4" : "lg:grid-cols-1"
                            }`}
                    >
                        {/* Sidebar - Desktop */}
                        {mode === 'shop' && (
                            <div className="lg:col-span-1 hidden lg:block">
                                <Suspense fallback={<div className="h-64 animate-pulse bg-neutral-100 rounded-lg" />}>
                                    <Sidebar />
                                </Suspense>
                            </div>
                        )}


                        {/* Main Content */}
                        <div className={mode === "shop" ? "lg:col-span-3" : "lg:col-span-1"}>
                            <div className="mb-8">
                                <Suspense fallback={<div className="h-10 animate-pulse bg-neutral-100 rounded" />}>
                                    <MobileAndSort />
                                </Suspense>
                            </div>

                            <Suspense fallback={<ProductsGrid.Skeleton />}>
                                <ProductsGrid products={products} />
                            </Suspense>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-16 flex justify-center">
                                    <Pagination
                                        currentPage={page}
                                        totalPages={totalPages}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </FilterProvider>
    );
}