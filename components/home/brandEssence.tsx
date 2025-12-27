'use client';

import { motion, type Variants } from 'framer-motion';

export default function BrandEssence() {
    const container: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    return (
        <section className="relative py-20 lg:py-32 bg-[#F6F5F2] overflow-hidden">

            {/* Soft Decorative Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-[#E8DCCB] rounded-full blur-3xl opacity-40" />

            <div className="relative container mx-auto px-6 lg:px-12">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                    {/* LEFT — BRAND STORY */}
                    <motion.div variants={item} className="space-y-8 text-center lg:text-left">
                        <span className="inline-block text-xs tracking-[0.35em] uppercase text-[#B89B5E] font-medium">
                            Crafted With Intention
                        </span>

                        <h2 className="text-4xl md:text-5xl font-serif leading-tight text-[#1A1A1A]">
                            Redefining <br />
                            <span className="italic text-[#3A3A3A]">Modern Women’s Fashion</span>
                        </h2>

                        <p className="text-lg text-gray-600 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Xavelle is born from a passion for timeless silhouettes, refined fabrics,
                            and confident femininity. Each piece is designed to feel effortless,
                            elegant, and deeply personal — made for women who value grace in everyday life.
                        </p>

                        <div className="flex justify-center lg:justify-start">
                            <button className="relative px-8 py-4 text-sm uppercase tracking-wider font-medium border border-[#1A1A1A] text-[#1A1A1A] rounded-sm transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white hover:shadow-lg">
                                Discover Our Story
                            </button>
                        </div>
                    </motion.div>

                    {/* RIGHT — CATEGORY CARDS */}
                    <motion.div
                        variants={container}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {[
                            {
                                title: "Everyday Elegance",
                                desc: "Chic daily wear with a refined edge",
                            },
                            {
                                title: "Occasion Luxe",
                                desc: "Statement pieces for special moments",
                            },
                            {
                                title: "Modern Ethnic",
                                desc: "Tradition reimagined for today",
                            },
                            {
                                title: "Seasonal Edit",
                                desc: "Curated collections for every season",
                            },
                        ].map((itemData, index) => (
                            <motion.div
                                key={index}
                                variants={item}
                                className="group relative bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-linear-to-br from-[#E6CBA8] to-[#B89B5E] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />

                                <h3 className="text-xl font-serif text-[#1A1A1A] mb-2">
                                    {itemData.title}
                                </h3>

                                <p className="text-sm text-gray-500 font-light leading-relaxed">
                                    {itemData.desc}
                                </p>

                                <span className="mt-6 inline-block text-xs uppercase tracking-widest text-[#B89B5E]">
                                    Explore
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
