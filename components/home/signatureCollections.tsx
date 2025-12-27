'use client';

import { motion, type Variants } from 'framer-motion';

export default function SignatureCollections() {
    const container: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: 'easeOut' },
        },
    };

    return (
        <section className="relative py-24 lg:py-32 bg-[#FAF9F6] overflow-hidden">

            {/* Soft Background Accent */}
            <div className="absolute -top-32 right-0 w-125 h-125 bg-[#EFE2D1] rounded-full blur-3xl opacity-50" />

            <div className="relative container mx-auto px-6 lg:px-12">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="inline-block text-xs tracking-[0.35em] uppercase text-[#B89B5E] font-medium mb-4">
                        Our Signature Edit
                    </span>

                    <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-tight">
                        Curated Collections <br />
                        <span className="italic text-[#3A3A3A]">Designed to Inspire</span>
                    </h2>
                </motion.div>

                {/* Collections Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {[
                        {
                            title: 'Everyday Chic',
                            subtitle: 'Effortless daily elegance',
                            image: '/logo.png',
                        },
                        {
                            title: 'Occasion Luxe',
                            subtitle: 'Statement styles for celebrations',
                            image: '/logo.png',
                        },
                        {
                            title: 'Modern Ethnic',
                            subtitle: 'Tradition with a contemporary soul',
                            image: '/logo.png',
                        },
                    ].map((collection, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="group relative h-105 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                        >
                            {/* Image */}
                            <img
                                src={collection.image}
                                alt={collection.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                            {/* Content */}
                            <div className="absolute bottom-0 p-8 text-white">
                                <h3 className="text-2xl font-serif mb-2">
                                    {collection.title}
                                </h3>
                                <p className="text-sm font-light opacity-90 mb-6">
                                    {collection.subtitle}
                                </p>

                                <span className="inline-block text-xs uppercase tracking-widest border-b border-white pb-1">
                                    Explore Collection
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
