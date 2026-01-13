interface ProductsHeroProps {
    totalProducts?: number;
}

export default function ProductsHero({ totalProducts }: ProductsHeroProps) {
    return (
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-amber-50/50 to-rose-50/50 transform -skew-y-3" />

            <div className="relative max-w-4xl mx-auto text-center py-20 lg:py-28 px-4">
                <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-neutral-700 border border-neutral-200/50">
                        Luxury Collection
                    </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-light tracking-tight text-neutral-900 mb-6">
                    <span className="block">Xavelle</span>
                    <span className="block font-serif italic text-4xl lg:text-5xl">Signature Collection</span>
                </h1>

                <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-8">
                    Timeless elegance meets modern craftsmanship. Each piece tells a story of luxury,
                    precision, and unparalleled attention to detail.
                </p>

                {totalProducts !== undefined && (
                    <div className="inline-flex items-center space-x-6 text-neutral-500 text-sm">
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            Curated Selection
                        </span>
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {totalProducts} Premium Items
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}