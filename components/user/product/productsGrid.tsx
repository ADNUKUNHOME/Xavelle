import ProductCard from './productCard';
import EmptyState from './emptyState';
import { Product } from '@/lib/types';

interface ProductsGridProps {
    products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
    if (!products.length) return <EmptyState />;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
}

// Skeleton Loader
ProductsGrid.Skeleton = function ProductsGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="bg-neutral-100 rounded-2xl aspect-3/4 mb-4" />
                    <div className="space-y-3">
                        <div className="h-4 bg-neutral-100 rounded w-3/4" />
                        <div className="h-6 bg-neutral-100 rounded w-1/2" />
                        <div className="h-4 bg-neutral-100 rounded w-1/4" />
                    </div>
                </div>
            ))}
        </div>
    );
};