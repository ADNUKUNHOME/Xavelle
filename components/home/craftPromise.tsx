'use client';

import { motion } from 'framer-motion';

export default function CraftPromise() {
    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    return (
        <section className="relative py-24 bg-[#111111] text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('/textures/fabric.jpg')] bg-cover bg-center" />

            <div className="relative container mx-auto px-6 lg:px-12">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-xs tracking-[0.35em] uppercase text-[#E6CBA8]">
                        The Xavelle Promise
                    </span>

                    <h2 className="mt-6 text-4xl md:text-5xl font-serif">
                        Crafted With Precision,<br />
                        <span className="italic text-neutral-300">Designed for Confidence</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {[
                        { title: 'Premium Fabrics', desc: 'Hand-selected materials for comfort & longevity' },
                        { title: 'Tailored Fit', desc: 'Designed to flatter real women, real bodies' },
                        { title: 'Ethical Craft', desc: 'Responsible sourcing & skilled artisans' },
                        { title: 'Lasting Finish', desc: 'Quality stitching and refined detailing' },
                    ].map((itemData, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            className="text-center space-y-4"
                        >
                            <h3 className="text-xl font-serif text-[#E6CBA8]">
                                {itemData.title}
                            </h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                {itemData.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
