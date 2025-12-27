'use client';

import { motion } from 'framer-motion';

export default function Testimonials() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center max-w-xl mx-auto mb-16">
                    <h2 className="text-4xl font-serif">
                        Loved by Women Like You
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {['Aanya', 'Meera', 'Ritika'].map((name, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="p-8 border rounded-xl"
                        >
                            <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                “The fabric quality and fitting exceeded my expectations.
                                Xavelle truly feels premium.”
                            </p>
                            <span className="text-sm font-medium text-[#1A1A1A]">
                                — {name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
