'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#FAF9F6]">
      {/* Background Accent Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1A1A1A] hidden lg:block" />

      <div className="container mx-auto px-6 lg:px-12 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Text Content */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <motion.div
              initial="initial"
              animate="animate"
              className="space-y-8"
            >
              <motion.span
                variants={fadeInUp}
                className="inline-block text-xs tracking-[0.3em] uppercase text-[#C5A059] font-medium"
              >
                The New Standard of Grace
              </motion.span>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-serif text-[#1A1A1A] leading-[1.1]"
              >
                Where Elegance <br />
                <span className="italic text-[#333]">Meets Everyday</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="max-w-md text-lg text-gray-600 font-light leading-relaxed"
              >
                Curating timeless silhouettes for the modern young woman.
                Experience a collection where premium fabrics meet avant-garde Indian craftsmanship.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4 pt-4"
              >
                <button className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-wider text-white bg-[#111111] rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
                  <span className="relative z-10">Shop Collection</span>
                  <span className="absolute inset-0 bg-linear-to-r from-[#B89B5E] to-[#E6CBA8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <button className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-wider text-[#111111] border border-[#111111] rounded-sm transition-all duration-300 hover:bg-[#111111] hover:text-white hover:shadow-lg">
                  Explore Styles
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Visual Content */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative aspect-[4/5] w-full max-w-[500px] mx-auto overflow-hidden rounded-tl-[100px] rounded-br-[100px] shadow-2xl"
            >
              {/* Replace with actual image source */}
              <div className="absolute inset-0 bg-neutral-200">
                <img
                  src="/logo.png"
                  alt="Premium Girls Fashion"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-10 -left-6 bg-white p-6 shadow-lg hidden md:block border-l-4 border-[#C5A059]">
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Limited Edition</p>
                <p className="text-xl font-serif text-[#1A1A1A]">Winter '25 Luxe</p>
              </div>
            </motion.div>

            {/* Subtle UI Detail */}
            <div className="absolute -z-10 top-1/2 -right-12 w-64 h-64 bg-[#F3E5D8] rounded-full blur-3xl opacity-50" />
          </div>

        </div>
      </div>
    </section>
  );
}