'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }
    };

    return (
        <section className="relative min-h-[90vh] overflow-hidden bg-[#FAF9F6]">

            {/* ===== MOBILE HERO BACKGROUND ===== */}
            <div className="absolute inset-0 lg:hidden">
                <img
                    src="/logo.png"
                    alt="Xavelle Premium Fashion"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/45" />
            </div>

            {/* Desktop Background Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1A1A1A] hidden lg:block" />

            <div className="relative container mx-auto px-6 lg:px-12 z-10 min-h-[90vh] flex items-center">
                <div className="flex flex-col lg:flex-row items-center gap-12 w-full">

                    {/* ===== TEXT CONTENT ===== */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <motion.div
                            initial="initial"
                            animate="animate"
                            className="space-y-6 md:space-y-8"
                        >
                            <motion.span
                                variants={fadeInUp}
                                className="inline-block text-xs tracking-[0.3em] uppercase font-medium text-[#E6CBA8] lg:text-[#C5A059]"
                            >
                                The New Standard of Grace
                            </motion.span>

                            <motion.h1
                                variants={fadeInUp}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] text-white lg:text-[#1A1A1A]"
                            >
                                Where Elegance <br />
                                <span className="italic text-neutral-200 lg:text-[#333]">
                                    Meets Everyday
                                </span>
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                className="max-w-md mx-auto lg:mx-0 text-base sm:text-lg font-light leading-relaxed text-neutral-200 lg:text-gray-600"
                            >
                                Curating timeless silhouettes for the modern young woman.
                                Premium fabrics meet avant-garde Indian craftsmanship.
                            </motion.p>

                            <motion.div
                                variants={fadeInUp}
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
                            >
                                <button className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-wider text-white bg-[#111111] rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
                                    <span className="relative z-10">Shop Collection</span>
                                    <span className="absolute inset-0 bg-linear-to-r from-[#B89B5E] to-[#E6CBA8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </button>

                                <button className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-wider text-white lg:text-[#111111] border border-white lg:border-[#111111] rounded-sm transition-all duration-300 hover:bg-white hover:text-black lg:hover:bg-[#111111] lg:hover:text-white">
                                    Explore Styles
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* ===== DESKTOP IMAGE ONLY ===== */}
                    <div className="hidden lg:block w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="relative aspect-4/5 w-full max-w-125 mx-auto overflow-hidden rounded-tl-[100px] rounded-br-[100px] shadow-2xl"
                        >
                            <img
                                src="/logo.png"
                                alt="Premium Girls Fashion"
                                className="w-full h-full object-cover"
                            />

                            {/* Floating Badge */}
                            <div className="absolute bottom-10 -left-6 bg-white p-6 shadow-lg border-l-4 border-[#C5A059]">
                                <p className="text-[10px] uppercase tracking-widest text-gray-400">
                                    Limited Edition
                                </p>
                                <p className="text-xl font-serif text-[#1A1A1A]">
                                    Winter '25 Luxe
                                </p>
                            </div>
                        </motion.div>

                        <div className="absolute -z-10 top-1/2 -right-12 w-64 h-64 bg-[#F3E5D8] rounded-full blur-3xl opacity-50" />
                    </div>

                </div>
            </div>
        </section>
    );
}
