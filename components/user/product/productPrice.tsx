interface ProductPriceProps {
    price: number;
    originalPrice?: number;
}

export default function ProductPrice({ price, originalPrice }: ProductPriceProps) {
    return (
        <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-light text-neutral-900">
                ₹{price.toLocaleString()}
            </span>
            {originalPrice && originalPrice > price && (
                <>
                    <span className="text-lg text-neutral-400 line-through">
                        ₹{originalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                        Save {Math.round((1 - price / originalPrice) * 100)}%
                    </span>
                </>
            )}
        </div>
    );
}