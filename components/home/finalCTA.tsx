'use client';

import { motion } from 'framer-motion';

export default function FinalCTA() {
    return (
        <section className="relative py-28 bg-[#1A1A1A] text-white text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center opacity-20" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative container mx-auto px-6 lg:px-12 max-w-3xl"
            >
                <h2 className="text-4xl md:text-5xl font-serif mb-6">
                    Step Into the World of Xavelle
                </h2>
                <p className="text-lg text-neutral-300 mb-10">
                    Discover styles crafted for confidence, elegance, and everyday luxury.
                </p>
                <button className="px-10 py-4 bg-white text-black uppercase tracking-wider text-sm rounded-sm hover:shadow-xl">
                    Shop Now
                </button>
            </motion.div>
        </section>
    );
}
