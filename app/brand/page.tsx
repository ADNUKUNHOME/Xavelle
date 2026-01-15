'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

export default function BrandPage() {
    return (
        <div className="bg-neutral-50 text-neutral-900">
            {/* Hero Section */}
            <section className="min-h-[80vh] flex items-center justify-center px-6">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl text-center"
                >
                    <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-6">
                        Our Story
                    </p>
                    <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
                        Crafted With Intention<br />
                        <span className="font-medium">Redefining Modern Women’s Fashion</span>
                    </h1>
                    <p className="mt-8 text-neutral-600 text-base md:text-lg leading-relaxed">
                        XAVELLE is born from a passion for timeless silhouettes, refined fabrics,
                        and confident femininity. Each piece is designed to feel effortless,
                        elegant, and deeply personal.
                    </p>
                </motion.div>
            </section>

            {/* Philosophy */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                            Our Philosophy
                        </h2>
                        <p className="mt-6 text-neutral-600 leading-relaxed">
                            True style transcends trends. We design with restraint and clarity,
                            balancing structure and softness to create pieces that remain relevant
                            beyond seasons.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="space-y-4 text-neutral-700"
                    >
                        <p>— Timeless design over fleeting fashion</p>
                        <p>— Quiet confidence, never excess</p>
                        <p>— Elegance rooted in everyday wear</p>
                    </motion.div>
                </div>
            </section>

            {/* Craftsmanship */}
            <section className="py-24 px-6 bg-neutral-50">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ duration: 0.7 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-light">Craftsmanship</h2>
                    <p className="mt-6 text-neutral-600 leading-relaxed">
                        Luxury reveals itself in the details. From fabric selection to final
                        finishing, every XAVELLE piece is shaped with care, precision, and
                        respect for craftsmanship.
                    </p>
                </motion.div>
            </section>

            {/* Values Grid */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {["Intentional Design", "Quality Over Quantity", "Respect for Craft", "Quiet Confidence"].map(
                        (value, i) => (
                            <motion.div
                                key={value}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="border border-neutral-200 p-8 rounded-2xl"
                            >
                                <h3 className="text-lg font-medium mb-3">{value}</h3>
                                <p className="text-sm text-neutral-600">
                                    Guided by clarity, restraint, and long-lasting value.
                                </p>
                            </motion.div>
                        )
                    )}
                </div>
            </section>

            {/* The Xavelle Woman */}
            <section className="py-32 px-6 bg-neutral-900 text-neutral-100">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-light">The XAVELLE Woman</h2>
                    <p className="mt-8 text-neutral-300 leading-relaxed">
                        She is defined by presence, not noise. Thoughtful, modern, and
                        confident — she dresses with intention and lives with clarity.
                    </p>
                </motion.div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 bg-neutral-50">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ duration: 0.6 }}
                    className="max-w-xl mx-auto text-center"
                >
                    <h3 className="text-2xl font-light mb-6">Discover Modern Elegance</h3>
                    <Link href="/user/products?mode=explore">
                        <Button className="rounded-full px-10 py-6 text-xs tracking-widest uppercase">
                            Explore Collections
                        </Button>
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
