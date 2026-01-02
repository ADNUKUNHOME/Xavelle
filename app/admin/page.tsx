import { getProductStats } from "@/lib/data/products";


export default async function AdminDashboard() {
    const stats = await getProductStats();

    const cards = [
        { label: 'Total Products', value: stats.total },
        { label: 'Featured Items', value: stats.featured },
        { label: 'Out of Stock', value: stats.outOfStock },
    ];

    return (
        <div>
            <h2 className="text-2xl font-light mb-8 italic">Welcome back, Admin.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <div key={card.label} className="bg-white p-8 border border-neutral-200 rounded-sm shadow-sm">
                        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">{card.label}</p>
                        <p className="text-4xl font-light">{card.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}