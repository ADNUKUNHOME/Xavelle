'use client';

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function BrandEssence() {
    const MotionImage = motion(Image);
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
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    const bgImages = [
        '/brandEssence-bg1.png',
        '/brandEssence-bg3.png',
        '/brandEssence-bg4.png',
        '/brandEssence-bg5.png',
    ];

    const [currentBg, setCurrentBg] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % bgImages.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative py-20 lg:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <AnimatePresence>
                    <MotionImage
                        key={currentBg}
                        src={bgImages[currentBg]}
                        alt="Brand essence background"
                        fill
                        priority
                        className="object-cover object-center lg:object-top"
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1.05 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2.2, ease: 'easeInOut' }}
                        sizes="100vw"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/50" />
            </div>

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
                        <span className="inline-block text-xs tracking-[0.35em] uppercase text-[#ebd9b4] font-medium">
                            Crafted With Intention
                        </span>

                        <h2 className="text-4xl md:text-5xl font-serif leading-tight text-[#f2eeee]">
                            Redefining <br />
                            <span className="italic text-[#a6a6a6]">Modern Women’s Fashion</span>
                        </h2>

                        <p className="text-lg text-gray-300 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Xavelle is born from a passion for timeless silhouettes, refined fabrics,
                            and confident femininity. Each piece is designed to feel effortless,
                            elegant, and deeply personal — made for women who value grace in everyday life.
                        </p>

                        {/* CTA */}
                        <div className="flex justify-center lg:justify-start">
                            <motion.button
                                whileHover={{ x: 2 }}
                                className="group inline-flex items-center gap-2 px-8 py-4 text-sm uppercase tracking-wider font-medium border border-white/30 text-white rounded-sm transition-all duration-300 hover:bg-white hover:text-black"
                            >
                                Discover Our Story
                                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* RIGHT — CATEGORY CARDS */}
                    <motion.div
                        variants={container}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {[
                            {
                                title: 'Everyday Elegance',
                                desc: 'Chic daily wear with a refined edge',
                                featured: true,
                            },
                            {
                                title: 'Occasion Luxe',
                                desc: 'Statement pieces for special moments',
                            },
                            {
                                title: 'Modern Ethnic',
                                desc: 'Tradition reimagined for today',
                            },
                            {
                                title: 'Seasonal Edit',
                                desc: 'Curated collections for every season',
                            },
                        ].map((card, index) => (
                            <motion.div
                                key={index}
                                variants={item}
                                className={`group relative p-8 rounded-2xl border border-white/10 shadow-xl transition-all duration-500
                                ${card.featured
                                        ? 'bg-linear-to-br from-[#1A1A1A] to-[#2A2A2A] sm:row-span-2'
                                        : 'bg-[#1A1A1A]/90 hover:bg-[#1A1A1A]'
                                    }`}
                                whileHover={{ y: -4 }}
                            >
                                {/* Soft glow */}
                                <div className="absolute inset-0 bg-linear-to-br from-[#E6CBA8] to-[#B89B5E] opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl" />

                                <h3 className="text-xl font-serif text-white mb-2">
                                    {card.title}
                                </h3>

                                <p className="text-sm text-gray-400 font-light leading-relaxed">
                                    {card.desc}
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
