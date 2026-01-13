interface ProductBadgeProps {
    category: string;
    type?: 'primary' | 'secondary';
}

const categoryColors: Record<string, string> = {
    'Furniture': 'bg-amber-100 text-amber-800',
    'Lighting': 'bg-violet-100 text-violet-800',
    'Decor': 'bg-rose-100 text-rose-800',
    'Textiles': 'bg-emerald-100 text-emerald-800',
    'Kitchen': 'bg-blue-100 text-blue-800',
    'Bath': 'bg-cyan-100 text-cyan-800',
    'default': 'bg-neutral-100 text-neutral-800',
};

export default function ProductBadge({ category, type = 'primary' }: ProductBadgeProps) {
    const colors = categoryColors[category] || categoryColors.default;

    if (type === 'secondary') {
        return (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-neutral-700 border border-neutral-200/50">
                {category}
            </span>
        );
    }

    return (
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${colors} backdrop-blur-sm`}>
            {category}
        </span>
    );
}