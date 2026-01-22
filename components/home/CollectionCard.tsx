'use client';

import { motion, Variants, useMotionValue, useTransform } from 'framer-motion';
import { Collection } from './signatureCollections';

const item: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: 'easeOut' },
    },
};

export default function CollectionCard({
    col,
    onClick,
}: {
    col: Collection;
    onClick: () => void;
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-50, 50], [4, -4]);
    const rotateY = useTransform(x, [-50, 50], [-4, 4]);

    return (
        <motion.article
            variants={item}
            style={{ rotateX, rotateY }}
            onMouseMove={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                x.set(e.clientX - rect.left - rect.width / 2);
                y.set(e.clientY - rect.top - rect.height / 2);
            }}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            onClick={onClick}
            className="group relative h-105 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
        >
            {/* Image */}
            <motion.img
                src={col.cover}
                alt={col.name}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 1 }}
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

            {/* Preview thumbnails */}
            {col.previews && (
                <div className="absolute top-6 left-6 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    {col.previews.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            className="w-10 h-14 object-cover rounded-md border border-white/30"
                        />
                    ))}
                </div>
            )}

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-serif mb-2">{col.name}</h3>
                <p className="text-sm opacity-90 mb-4">{col.subtitle}</p>

                <div className="flex items-center justify-between text-xs opacity-80 mb-6">
                    {col.count > 0 ? (
                        <>
                            <span>{col.count} Products</span>
                            <span>From ₹{col.startingPrice}</span>
                        </>
                    ) : (
                        <span className="italic opacity-70">Editorial Preview</span>
                    )}
                </div>

                <motion.span
                    whileHover={{ x: 6 }}
                    className="inline-block w-fit text-xs uppercase tracking-widest border-b border-white pb-1"
                >
                    {col.count > 0 ? 'Explore Collection' : 'View Editorial'}
                </motion.span>
            </div>

            {/* Glow */}
            <div className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/10 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />
        </motion.article>
    );
}
