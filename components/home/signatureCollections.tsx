'use client';

import { motion, Variants } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import CollectionCard from './CollectionCard';

type Product = {
    _id: string;
    title: string;
    price: number;
    images: string[];
    category: string;
};

export type Collection = {
    name: string;
    subtitle: string;
    cover: string;
    count: number;
    startingPrice: number;
    previews?: string[];
};

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18 } },
};

const editorialCollections: Collection[] = [
    {
        name: 'Everyday Chic',
        subtitle: 'Effortless everyday elegance',
        cover: '/logo.png',
        count: 0,
        startingPrice: 0,
    },
    {
        name: 'Occasion Luxe',
        subtitle: 'Designed for unforgettable moments',
        cover: '/logo.png',
        count: 0,
        startingPrice: 0,
    },
    {
        name: 'Modern Ethnic',
        subtitle: 'Tradition refined for today',
        cover: '/logo.png',
        count: 0,
        startingPrice: 0,
    },
];

export default function SignatureCollections() {
    const router = useRouter();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();

                const resolved = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.products)
                        ? data.products
                        : [];

                setProducts(resolved);
            } catch {
                setHasError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const collections: Collection[] = useMemo(() => {
        if (!products.length) return [];

        const grouped = products.reduce<Record<string, Product[]>>((acc, p) => {
            if (!p.category) return acc;
            acc[p.category] = acc[p.category] || [];
            acc[p.category].push(p);
            return acc;
        }, {});

        return Object.entries(grouped).map(([name, items]) => ({
            name,
            subtitle:
                name === 'Everyday Chic'
                    ? 'Effortless everyday elegance'
                    : name === 'Occasion Luxe'
                        ? 'Designed for unforgettable moments'
                        : 'Curated fashion for modern wardrobes',
            cover: items[0]?.images?.[0] ?? '/placeholder.jpg',
            previews: items.slice(0, 3).map(p => p.images[0]),
            count: items.length,
            startingPrice: Math.min(...items.map(i => i.price)),
        }));
    }, [products]);

    const displayCollections =
        collections.length > 0 ? collections : editorialCollections;

    return (
        <section className="relative py-28 bg-[#FAF9F6] overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-2xl mx-auto mb-20"
                >
                    <span className="text-xs tracking-[0.4em] uppercase text-[#c7b07b]">
                        Signature Collections
                    </span>
                    <h2 className="mt-6 text-4xl md:text-5xl font-serif text-[#2e2e2e]">
                        Curated Edits <br />
                        <span className="italic text-[#9c9c9c]">Crafted with Intent</span>
                    </h2>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {loading
                        ? Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-105 rounded-2xl bg-neutral-200 animate-pulse"
                            />
                        ))
                        : displayCollections.map((col, index) => (
                            <CollectionCard
                                key={index}
                                col={col}
                                onClick={() =>
                                    col.count > 0 &&
                                    router.push(
                                        `/user/products?category=${encodeURIComponent(col.name)}`
                                    )
                                }
                            />
                        ))}
                </motion.div>
            </div>
        </section>
    );
}
