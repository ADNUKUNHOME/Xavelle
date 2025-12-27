'use client';

import { motion } from 'framer-motion';

export default function BestSellers() {
    return (
        <section className="py-24 bg-[#FAF9F6]">
            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="text-xs tracking-[0.35em] uppercase text-[#B89B5E]">
                        Customer Favorites
                    </span>
                    <h2 className="mt-4 text-4xl md:text-5xl font-serif">
                        Best Sellers
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((_, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -6 }}
                            className="bg-white rounded-xl overflow-hidden shadow-md"
                        >
                            <img
                                // src={`/products/p${i + 1}.jpg`}
                                src={`/logo.png`}
                                className="w-full h-65 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-sm font-medium text-[#1A1A1A]">
                                    Signature Dress {i + 1}
                                </h3>
                                <p className="text-xs text-gray-500">₹4,999</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
